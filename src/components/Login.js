import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory, useRouteMatch } from 'react-router-dom'
import './styles/login.scss'


function Login({ error, loggedIn, handleLogin, isFetching }) {
  const [state, setState] = useState({ email: '', password: '' })

  let history = useHistory()
  const match = useRouteMatch()

  const errorState = () => {
    if (error === 'Имя пользователя или пароль введены не верно') {
      setState(prevState => {
        return { ...prevState, password: '' }
      })
    }
  }

  useEffect(() => {
    const login = document.querySelector('.login')
    errorState()
    if (isFetching) {
      login.classList.add('fetching')
    } else {
      login.classList.remove('fetching')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching])

  useEffect(() => {
    if (loggedIn) {
      if (match.params.previous === "profile") {
        history.push('/profile')
      } else if (match.params.previous === "registr") {
        history.push('/home')
      } else {
        history.go(-1)
      }
    }
  }, [history, loggedIn, match.params.previous])

  const handleSubmit = (e) => {
    e.preventDefault()
    handleLogin(state)
  }

  const handleChange = (e) => {
    e.preventDefault()
    setState(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <div>
        <label>
          E-mail: <input name="email" onChange={handleChange} value={state.email}></input>
        </label>
      </div>
      <div>
        <label>
          Пароль: <input name="password" type="password" onChange={handleChange} value={state.password}></input>
        </label>
      </div>
      <input type="submit"></input>
      {error && <div>{error}</div>}
      <div>
        <a href="./registr">Регистрация</a>
      </div>
    </form>
  )
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default Login

