import { ERROR, GET_NEWS, GET_PROFILE, SHOW_LOADING, HIDE_LOADING, POST_NEWS } from "./types"

const initialState = {
  news: null,
  isFetching: false,
  error: '',
  profile: null,
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADING:
      return { ...state, isFetching: true }
    case HIDE_LOADING:
      return { ...state, isFetching: false }
    case ERROR:
      return { ...state, error: action.error }
    case GET_PROFILE:
      return { ...state, error: '', profile: action.payload }
    case GET_NEWS:
      return { ...state, error: '', news: action.payload }
    case POST_NEWS:
      return { ...state, news: state.news.concat(action.payload) }
    default: return state
  }
}