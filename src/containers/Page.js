import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, withProps, withHandlers, lifecycle } from 'recompose'
import { isPageLoading, getPage, getPageError } from '../reducers'
import { requestPage } from '../actions'
import Page from '../components/Page'

const mapStateToProps = (state, { id }) => ({
  loading: isPageLoading(state, id),
  ...getPage(state, id),
  error: getPageError(state, id)
})

const enhance = compose(
  withRouter,
  withProps(({ match }) => ({ id: match.params.id })),
  connect(mapStateToProps, { requestPage }),
  withHandlers({
    fetchData: ({ loading, error, title, requestPage, id }) => () => {
      if (!loading && !error && title == null) {
        requestPage(id)
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
const FetchedPage = ({ loading, error, title, content }) => {
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

  return <Page title={title} content={content} />
}

export default enhance(FetchedPage)
