import * as types from '../constants/actionTypes';
import featuredPosts, * as fromFeaturedPosts from './featuredPosts';
import resources, * as fromResources from './resources';

export const getPosts = state => state.posts || {};
export const getPages = state => state.pages || {};
export const getNavLinks = state => state.navLinks;

export const isFeaturedPostsLoading = state =>
  fromFeaturedPosts.isLoading(state.featuredPosts || {});
export const getPostIds = state =>
  fromFeaturedPosts.getIds(state.featuredPosts || {});
export const getFeaturedPostsError = state =>
  fromFeaturedPosts.getError(state.featuredPosts || {});

export const isPostLoading = (state, id) =>
  fromResources.isLoading(getPosts(state), id);
export const getPost = (state, id) =>
  fromResources.getResource(getPosts(state), id);
export const getPostError = (state, id) =>
  fromResources.getError(getPosts(state), id);

export const isPageLoading = (state, id) =>
  fromResources.isLoading(getPages(state), id);
export const getPage = (state, id) =>
  fromResources.getResource(getPages(state), id);
export const getPageError = (state, id) =>
  fromResources.getError(getPages(state), id);

export const getFeaturedPosts = state =>
  getPostIds(state).map(id => getPost(state, id));

const rootReducer = (state = {}, action) => {
  const {type} = action;
  switch (type) {
    case types.REQUEST_FEATURED_POSTS_LIST:
    case types.RECEIVE_FEATURED_POSTS_LIST:
    case types.RECEIVE_FEATURED_POSTS_ERROR:
      return {
        ...state,
        featuredPosts: featuredPosts(state.featuredPosts, action),
        posts: resources(state.posts, action),
      };
    case types.REQUEST_PAGE:
    case types.RECEIVE_PAGE:
    case types.RECEIVE_PAGE_ERROR:
      return {
        ...state,
        pages: resources(state.pages, action),
      };
    case types.REQUEST_POST:
    case types.RECEIVE_POST:
    case types.RECEIVE_POST_ERROR:
      return {
        ...state,
        posts: resources(state.posts, action),
      };
    default:
      return state;
  }
};

export default rootReducer;
