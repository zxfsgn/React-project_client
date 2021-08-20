import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { editArticle, getNews } from '../redux/actions'

const Edit = () => {
  const dispatch = useDispatch()



  let history = useHistory()

  const match = useRouteMatch()
  const id = Number(match.params.article)
  const news = useSelector(state => state.app.news)
  const init = news.find((item) => item.id === id)
  const [state, setState] = useState({ title: init.title, text: init.text })
  /*useEffect(() => {
    if (!news) {
      dispatch(getNews())
      console.log(news)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (news) {
    const init = news.find((item) => item.id === id)
    setState({ title: init.title, text: init.text })
  }*/

  const handleChange = (e) => {
    e.preventDefault()
    setState(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(editArticle({ id, ...state }))
    history.push('/news')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={state.title} onChange={handleChange}></input>
      <textarea name="textarea" value={state.text} onChange={handleChange}></textarea>
      <input type="submit"></input>
    </form>
  )
}

export default Edit
