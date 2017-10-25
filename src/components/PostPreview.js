import React from 'react'
import { Link } from 'react-router-dom'
import Markdown from 'react-remarkable'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

const PostPreview = ({ id, title, date, content }) => (
  <article className="post">
    <h2 className="post-title">
      <Link to={`post/${id}`}>{title}</Link>
    </h2>
    <time dateTime={date.toISOString()} className="post-date">
      {date.toLocaleDateString()}
    </time>
    <Markdown
      source={content.split(/[\n\r]{2,}/)[0]}
      options={{
        langPrefix: 'hljs language-',
        highlight: code => hljs.highlightAuto(code).value
      }}
    />
  </article>
)

export default PostPreview
