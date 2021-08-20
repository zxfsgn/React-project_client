import { NEWS_URI, PROFILE_URI, ROOT_URL } from "../constants"
import { ERROR, GET_NEWS, GET_PROFILE, LOGIN_SUCCESS, LOGOUT, SHOW_LOADING, HIDE_LOADING, POST_NEWS, EDIT_ARTICLE, DELETE_ARTICLE } from "./types"

export function showLoading() {
  return {
    type: SHOW_LOADING
  }
}

export function hideLoading() {
  return {
    type: HIDE_LOADING
  }
}

export function logOut() {
  return {
    type: LOGOUT
  }
}

export function logIn(id) {
  return {
    type: LOGIN_SUCCESS,
    payload: id
  }
}

export function fail(error) {
  return {
    type: ERROR,
    error: error
  }
}

export function handleLogin(user) {
  return async dispatch => {
    dispatch(showLoading())
    try {
      const regex = /^[\d\w._-]+@([\d\w._-]+\.)+\w{2,4}$/
      if (!regex.test(user.email)) {
        throw new SyntaxError('Invalid Email')
      }
      const response = await fetch(`${ROOT_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      const json = await response.json()
      if (json.status === 'err') {
        throw new Error(json.message)
      }
      dispatch(logIn(json.token))
      dispatch(fail(''))
    } catch (e) {
      const kindError = (error) => {
        switch (error.message) {
          case "wrong_email_or_password":
            return 'Имя пользователя или пароль введены не верно'
          case "Failed to fetch":
            return 'Сервер не доступен'
          case "Invalid Email":
            return 'Email введён неверно'
          default: throw error
        }
      }
      dispatch(fail(kindError(e)))
    } finally {
      dispatch(hideLoading())
    }
  }
}

export function getProfile(token) {
  return async dispatch => {
    dispatch(showLoading())
    try {
      const response = await fetch(PROFILE_URI, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const json = await response.json()
      if (json.status === 'err') {
        throw new Error(json.message)
      }
      dispatch({ type: GET_PROFILE, payload: json })
    } catch (e) {
      const kindError = (error) => {
        switch (error.message) {
          case "user_not_found":
            return 'Пользователь не найден'
          case "Failed to fetch":
            return 'Сервер не доступен'
          default: throw error
        }
      }
      dispatch(fail(kindError(e)))
    } finally {
      dispatch(hideLoading())
    }
  }
}

export function getNews() {
  return async dispatch => {
    dispatch(showLoading())
    try {
      const response = await fetch(NEWS_URI)
      const json = await response.json()
      setTimeout(() => {
        dispatch({ type: GET_NEWS, payload: json.data })
        dispatch(hideLoading())
        fail('')
      }, 300)
    } catch (e) {

    } finally {

    }
  }
}

export function postNews(article) {
  return async dispatch => {
    try {
      const response = await fetch(NEWS_URI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(article)
      })
      const json = await response.json()
      dispatch({ type: POST_NEWS, payload: { ...article, id: json.id } })
      fail('')
    } catch (e) {

    } finally {
    }
  }
}

export function editArticle(article) {
  return async dispatch => {
    try {
      const response = await fetch(NEWS_URI, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(article)
      })
      const news = await response.json()
      dispatch({ type: EDIT_ARTICLE, payload: news })
      fail('')
    } catch (e) {

    } finally {
    }
  }
}

export function deleteArticle(article) {
  return async dispatch => {
    try {
      const response = await fetch(NEWS_URI, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: article })
      })
      const news = await response.json()
      dispatch({ type: DELETE_ARTICLE, payload: news })
      fail('')
    } catch (e) {

    } finally {
    }
  }
}