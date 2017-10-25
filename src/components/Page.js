import React from 'react'
import Markdown from 'react-remarkable'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import Header from './Header'
import Footer from './Footer'

const Page = ({ title, content }) => (
  <div>
    <Header />
    <article className="page">
      <h1 className="page-title">{title}</h1>
      <Markdown
        source={content}
        options={{ highlight: code => hljs.highlightAuto(code).value }}
      />
    </article>
    <Footer />
  </div>
)

export default Page
