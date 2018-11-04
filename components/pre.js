import { Component } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

export default class extends Component {
  componentDidMount() {
    const code = document.querySelectorAll('pre > code')
    code.forEach(hljs.highlightBlock)
  }

  render() {
    return <pre>{this.props.children}</pre>
  }
}
