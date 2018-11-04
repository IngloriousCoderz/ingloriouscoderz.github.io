import { withPostsFilterBy, inCategory } from 'nextein/posts'
import { Content } from 'nextein/post'

import Layout from '~/layouts/default'

export default withPostsFilterBy(inCategory('blog'))(({ posts }) => (
  <Layout>
    {posts.sort(byDateDesc).map((post, index) => (
      <article key={`post-${index}`}>
        <h2>
          <a href={post.data.url}>{post.data.title}</a>
        </h2>
        <Content {...post} excerpt />
      </article>
    ))}
  </Layout>
))

function byDateDesc(a, b) {
  if (a.data.date < b.data.date) return 1
  if (a.data.date > b.data.date) return -1
  return 0
}
