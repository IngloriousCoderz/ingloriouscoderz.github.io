import * as types from '../constants/actionTypes'

export const requestList = type => ({
  type: types.REQUEST_LIST,
  payload: { type }
})

export const receiveList = (type, list) => ({
  type: types.RECEIVE_LIST,
  payload: { type, list }
})

export const requestData = (type, id) => ({
  type: types.REQUEST_DATA,
  payload: { type, id }
})

export const receiveData = (type, id, meta, content) => ({
  type: types.RECEIVE_DATA,
  payload: { type, id, meta, content }
})

export const receiveError = (message) => ({
  type: types.RECEIVE_ERROR,
  payload: { message },
  error: true
})
