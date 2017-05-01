import React, {Component} from 'react';
import {connect} from 'react-redux';
import {isPostLoading, getPost, getPostError} from '../reducers';
import {requestPost} from '../actions';
import Post from '../components/Post';

class FetchedPost extends Component {
  fetchData() {
    const {loading, error, title, requestPost, params} = this.props;
    if (!loading && !error && title == null) {
      requestPost(params.id);
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    this.fetchData();
  }

  render() {
    const {loading, error, title, date, content} = this.props;
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return (
        <div>
          <h2>Something went wrong :'(</h2>
          <p>{error}</p>
        </div>
      );
    }

    return <Post title={title} date={date} content={content} />;
  }
}

const mapStateToProps = (state, {params}) => ({
  loading: isPostLoading(state, params.id),
  ...getPost(state, params.id),
  error: getPostError(state, params.id),
});

export default connect(mapStateToProps, {requestPost})(FetchedPost);
