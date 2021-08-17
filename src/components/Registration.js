import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export const Registration = () => {
  const [state, setState] = useState({ email: '', password: '' })

  let history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    })
    history.push('/login/registr')
  }

  const handleChange = (e) => {
    e.preventDefault()
    setState(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <input name="email" onChange={handleChange} value={state.email}></input>
      <input name="password" type="password" onChange={handleChange} value={state.password}></input>
      <input type="submit" ></input>
    </form>
  )
}
