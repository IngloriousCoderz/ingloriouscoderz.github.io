import React from 'react'
import {Link} from 'react-router'
import Markdown from 'react-remarkable'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

const PostPreview = ({id, title, date, content}) => (
  <article className='post'>
    <h1 className='post-title'>
      <Link to={`post/${id}`}>{title}</Link>
    </h1>
    <time dateTime={date.toISOString()} className='post-date'>{date.toLocaleDateString()}</time>
    <Markdown source={content.split(/[\n\r]{2,}/)[0]} options={{highlight: code => hljs.highlightAuto(code).value}}/>
  </article>
)

export default PostPreview
