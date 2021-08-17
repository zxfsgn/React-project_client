import { LOGIN_SUCCESS, LOGOUT } from "./types"

const initialState = {
  userId: '',
  loggedIn: false,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      localStorage.removeItem('loggedIn')
      localStorage.removeItem('token')
      return { ...state, loggedIn: false, token: '' }
    case LOGIN_SUCCESS:
      localStorage.setItem('loggedIn', true)
      localStorage.setItem('token', action.payload)
      return { ...state, loggedIn: true, token: action.payload }
    default: return state
  }
}