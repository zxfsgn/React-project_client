import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import Article from './components/Article';
import Edit from './components/Edit';
import Home from './components/Home';
import Login from './components/Login';
import News from './components/News';
import Profile from './components/Profile';
import { Registration } from './components/Registration';
import { deleteArticle, getNews, getProfile, handleLogin, logIn, logOut, postNews } from "./redux/actions"

function App({ loggedIn, handleLogin, error, getProfile, token, profile, isFetching, getNews, news, postNews, editArticle, deleteArticle }) {
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem('loggedIn')) {
      dispatch(logIn(localStorage.getItem('token')))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleClick(e) {
    e.preventDefault()
    dispatch(logOut())
  }

  return (
    <Router>
      <div className="App">
        <nav>
          <ul className="Navigation">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/news">News</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              {loggedIn ? <button onClick={handleClick}>logout</button> : <Link to="/login">Login</Link>}
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/news/:article/edit">
            <Edit />
          </Route>
          <Route path="/news/:article/">
            <Article deleteArticle={deleteArticle} />
          </Route>
          <Route path="/registr">
            <Registration />
          </Route>
          <Route path="/login/:previous?">
            <Login handleLogin={handleLogin} loggedIn={loggedIn} error={error} isFetching={isFetching} />
          </Route>
          <Route path="/news">
            <News editArticle={editArticle} deleteArticle={deleteArticle} isFetching={isFetching} getNews={getNews} postNews={postNews} news={news} />
          </Route>
          <Route path="/profile">
            {loggedIn ? <Profile logOut={logOut} getProfile={getProfile} token={token} profile={profile} error={error} isFetching={isFetching} /> : <Redirect to="/login/profile" />}
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    handleLogin: (user) => dispatch(handleLogin(user)),
    logOut: logOut,
    getProfile: (token) => dispatch(getProfile(token)),
    getNews: () => dispatch(getNews()),
    postNews: (article) => dispatch(postNews(article)),
    deleteArticle: (article) => dispatch(deleteArticle(article))
  }
}

const mapStateToProps = state => {
  return {
    profile: state.app.profile,
    token: state.user.token,
    loggedIn: state.user.loggedIn,
    error: state.app.error,
    isFetching: state.app.isFetching,
    news: state.app.news
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
