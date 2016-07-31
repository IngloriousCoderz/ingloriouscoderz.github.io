import React from 'react'
import Markdown from 'react-remarkable'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import Header from './Header'
import Footer from './Footer'

const Post = ({id, title, date, content}) => (
  <div>
    <Header/>
    <article className='post'>
      <h1 className='post-title'>{title}</h1>
      <time
        dateTime={date ? date.toISOString() : ''}
        className='post-date'>
        {date ? date.toLocaleDateString() : ''}
      </time>
      <Markdown source={content} options={{highlight: code => hljs.highlightAuto(code).value}}/>
    </article>
    <Footer/>
  </div>
)

export default Post
