import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import Home from './components/Home';
import Login from './components/Login';
import News from './components/News';
import Profile from './components/Profile';
import { Registration } from './components/Registration';
import { getNews, getProfile, handleLogin, logIn, logOut, postNews } from "./redux/actions"

function App({ loggedIn, handleLogin, error, getProfile, token, profile, isFetching, getNews, news, postNews }) {
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
          <Route path="/registr">
            <Registration />
          </Route>
          <Route path="/login/:previous?">
            <Login handleLogin={handleLogin} loggedIn={loggedIn} error={error} isFetching={isFetching} />
          </Route>
          <Route path="/news">
            <News isFetching={isFetching} getNews={getNews} postNews={postNews} news={news} />
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
    postNews: (article) => dispatch(postNews(article))
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
