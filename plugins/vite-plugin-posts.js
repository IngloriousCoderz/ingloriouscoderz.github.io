import fs from "node:fs/promises"

import { renderMarkdown } from "@inglorious/ssx/markdown"
import matter from "gray-matter"

// The query suffixes keep SSX's own markdown plugin, which would turn each post
// into a page of its own, away from these files:
//   - `post.md?post`      → { metadata, html }, rendered at build time
//   - `post.md?post-meta` → { metadata } only
const FULL = "?post"
const META = "?post-meta"

export function postsPlugin() {
  return {
    name: "ic-blog-posts",
    enforce: "pre",

    async load(id) {
      const query = [META, FULL].find((q) => id.endsWith(`.md${q}`))
      if (!query) return

      const [file] = id.split("?")
      this.addWatchFile(file)

      const source = await fs.readFile(file, "utf-8")
      const { data, content } = matter(source)
      const metadata = JSON.stringify(data)

      if (query === META) {
        return `export const metadata = ${metadata}`
      }

      const html = JSON.stringify(renderMarkdown(content))
      return `export const metadata = ${metadata}\nexport const html = ${html}`
    },
  }
}
