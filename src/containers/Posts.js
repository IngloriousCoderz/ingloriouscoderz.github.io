import React, {Component} from 'react'
import {connect} from 'react-redux'
import {isFeaturedPostsLoading, getFeaturedPosts, getFeaturedPostsError} from '../reducers'
import {requestFeaturedPostsList} from '../actions'
import Posts from '../components/Posts'

class FetchedPosts extends Component {
  fetchList() {
    const {loading, error, posts, requestFeaturedPostsList} = this.props
    if (!loading && !error && posts.length === 0) {
      requestFeaturedPostsList()
    }
  }

  componentDidMount() {
    this.fetchList()
  }

  componentDidUpdate(prevProps) {
    this.fetchList()
  }

  render() {
    const {loading, error, posts} = this.props
    if (loading) {
      return <p>Loading...</p>
    }

    if (error) {
      return (
        <div>
          <h2>Something went wrong :'(</h2>
          <p>{error}</p>
        </div>
      )
    }

    return <Posts posts={posts}/>
  }
}

const mapStateToProps = (state, ownProps) => ({
  loading: isFeaturedPostsLoading(state),
  posts: getFeaturedPosts(state),
  error: getFeaturedPostsError(state)
})

export default connect(mapStateToProps, {requestFeaturedPostsList})(FetchedPosts)
