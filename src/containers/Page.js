import React, {Component} from 'react'
import {connect} from 'react-redux'
import {isPageLoading, getPage, getPageError} from '../reducers'
import {requestPage} from '../actions'
import Page from '../components/Page'

class FetchedPage extends Component {
  fetchData() {
    const {loading, error, title, requestPage, params} = this.props
    if (!loading && !error && title == null) {
      requestPage(params.id)
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    this.fetchData()
  }

  render() {
    const {loading, error, title, content} = this.props
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

    return <Page title={title} content={content}/>
  }
}

const mapStateToProps = (state, {params}) => ({
  loading: isPageLoading(state, params.id),
  ...getPage(state, params.id),
  error: getPageError(state, params.id)
})

export default connect(mapStateToProps, {requestPage})(FetchedPage)
