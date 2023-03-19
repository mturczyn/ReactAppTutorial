import { useState } from 'react'
import ReactDOM from 'react-dom'

function Banner(props) {
  const message = props.userLoggedIn ? 'Welcome' : 'Plase sign in'
  const header = props.userLoggedIn ? 'Hi user' : 'Hello stranger'
  return (
    <div>
      <h2>{header}</h2>
      <p>{message}</p>
      <div id='userInfo' />
    </div>
  )
}

function UserInfo() {
  return ReactDOM.createPortal(
    <div>
      <h3>Username</h3>
      <p>MichalTurczyn</p>
      <h3>Date logged in</h3>
      <p>{new Date().toLocaleTimeString()}</p>
    </div>,
    document.getElementById('userInfo')
  )
}

export default function LoggingControlPanel() {
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const buttonTxt = userLoggedIn ? 'Logout' : 'Login'

  return (
    <div>
      <Banner userLoggedIn={userLoggedIn} />
      <button onClick={() => setUserLoggedIn(x => !x)}>{buttonTxt}</button>
      {userLoggedIn && <UserInfo />}
    </div>
  )
}
