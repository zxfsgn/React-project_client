import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import Loading from './Loading'
import './styles/news.scss'

function News({ isFetching, getNews, postNews, news }) {

  const [state, setState] = useState({ title: '', text: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    postNews(state)
  }

  const handleChange = (e) => {
    e.preventDefault()
    setState(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  useEffect(() => {
    if (!news) {
      getNews()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (news) {

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [news])

  function show() {
    return (
      <article className="news__main">
        <h1>News</h1>
        <ul className="news__list">
          {news.map(item => <li key={item.id}>
            <h2>{item.title}</h2>
            <div>{item.text}</div>
          </li>)}
        </ul>
        <footer>Всего новостей: {news.length}</footer>
      </article>
    )
  }

  if (isFetching) {
    return <Loading />
  }
  if (!news) {
    return (
      <span>news</span>
    )
  }
  return (
    <main className="news__wrapper">
      {show()}
      <form onSubmit={handleSubmit}>
        <input name="title" onChange={handleChange} value={state.title}></input>
        <input name="text" type="text" onChange={handleChange} value={state.text}></input>
        <input type="submit" ></input>
      </form>
    </main>
  )
}

News.propTypes = {
  isFetching: PropTypes.bool.isRequired
}

export default News



