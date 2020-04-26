import { useEffect } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

export default ({ children }) => {
  useEffect(() => {
    const code = document.querySelectorAll('pre > code')
    code.forEach(hljs.highlightBlock)
  }, [])

  return <pre>{children}</pre>
}
