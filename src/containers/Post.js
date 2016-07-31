import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPost} from '../reducers'
import {requestData} from '../actions'
import Post from '../components/Post'

class FetchedPost extends Component {
  fetchData() {
    const {title, requestData, params} = this.props
    if (title == null) {
      requestData('post', params.id)
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    this.fetchData()
  }

  render() {
    return <Post {...this.props}/>
  }
}

const mapStateToProps = (state, {params}) => {
  const post = getPost(state, params.id)
  return post ? {
    title: post.meta.title,
    date: post.meta.date,
    content: post.content
  } : {}
}

export default connect(mapStateToProps, {requestData})(FetchedPost)
