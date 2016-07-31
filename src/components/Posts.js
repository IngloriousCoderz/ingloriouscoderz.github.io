import React from 'react'
import PostPreview from './PostPreview'

const Posts = ({posts}) => (
  <div>
    {posts.map(({id, ...rest}) => <PostPreview key={id} id={id} {...rest} />)}
  </div>
)

export default Posts
