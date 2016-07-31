import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPage} from '../reducers'
import {requestData} from '../actions'
import Page from '../components/Page'

class FetchedPage extends Component {
  fetchData() {
    const {title, requestData, params} = this.props
    if (title == null) {
      requestData('page', params.id)
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    this.fetchData()
  }

  render() {
    return <Page {...this.props}/>
  }
}

const mapStateToProps = (state, {params}) => {
  const page = getPage(state, params.id)
  return page ? {
    title: page.meta.title,
    content: page.content
  } : {}
}

export default connect(mapStateToProps, {requestData})(FetchedPage)
