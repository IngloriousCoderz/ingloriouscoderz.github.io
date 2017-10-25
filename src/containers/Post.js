import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, withProps, withHandlers, lifecycle } from 'recompose'
import { isPostLoading, getPost, getPostError } from '../reducers'
import { requestPost } from '../actions'
import Post from '../components/Post'

const mapStateToProps = (state, { id }) => ({
  loading: isPostLoading(state, id),
  ...getPost(state, id),
  error: getPostError(state, id)
})

const enhance = compose(
  withRouter,
  withProps(({ match }) => ({ id: match.params.id })),
  connect(mapStateToProps, { requestPost }),
  withHandlers({
    fetchData: ({ loading, error, title, requestPost, id }) => () => {
      if (!loading && !error && title == null) {
        requestPost(id)
      }
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.fetchData()
    },

    componentDidUpdate(prevProps) {
      this.props.fetchData()
    }
  })
)

const FetchedPost = ({ loading, error, title, date, content }) => {
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

  return <Post title={title} date={date} content={content} />
}

export default enhance(FetchedPost)
