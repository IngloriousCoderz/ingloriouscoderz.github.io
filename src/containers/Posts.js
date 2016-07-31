import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPostPreviews} from '../reducers'
import {requestList} from '../actions'
import Posts from '../components/Posts'

class FetchedPosts extends Component {
  fetchList() {
    const {posts, requestList} = this.props
    if (posts.length === 0) {
      requestList('post')
    }
  }

  componentDidMount() {
    this.fetchList()
  }

  componentDidUpdate(prevProps) {
    this.fetchList()
  }

  render() {
    return <Posts {...this.props}/>
  }
}

const mapStateToProps = (state, ownProps) => ({
  posts: getPostPreviews(state)
})

export default connect(mapStateToProps, {requestList})(FetchedPosts)
