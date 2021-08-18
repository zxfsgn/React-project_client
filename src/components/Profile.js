import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './styles/profile.scss'
import Loading from './Loading'

function Profile({ getProfile, token, isFetching, profile }) {

  useEffect(() => {
    if (!profile) {
      getProfile(token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function show() {
    console.log(profile)
    const { data: { city, languages } } = profile
    return (
      <div>
        <div>Город: {city}</div>
        <span>Знание языков:</span>
        <ul>{languages.map(language => <li key={language}>{language}</li>)}</ul>
      </div>
    )
  }

  if (isFetching) {
    return <Loading />
  }

  if (!profile) {
    return (
      <span>profile</span>
    )
  }

  return (
    <div>
      {show()}
    </div>
  )
}

Profile.propTypes = {
  logOut: PropTypes.func.isRequired
}

export default Profile

