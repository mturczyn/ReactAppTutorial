import React from 'react'

function UserGreeting(props) {
  return (
    <div>
      <b>Welcome!</b>
    </div>
  )
}

function GuestGreeting(props) {
  return (
    <div>
      Please, <b>GTFO</b>
    </div>
  )
}

function Greeting(props) {
  if (props.isLoggedIn) {
    return UserGreeting(props)
  }

  return GuestGreeting(props)
}

function LoginButton(props) {
  return <button onClick={props.onClick}>Login</button>
}

function LogoutButton(props) {
  return <button onClick={props.onClick}>Logout</button>
}

export class LoginControl extends React.Component {
  constructor(props) {
    super(props)
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
    this.state = { isLoggedIn: false }
  }

  handleLoginClick() {
    this.setState({ isLoggedIn: true })
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false })
  }

  render() {
    /**
     * let button;
     */
    /**
     * if (this.state.isLoggedIn) {
     */
    /**
     *     button = <LogoutButton onClick={this.handleLogoutClick} />;
     */
    /**
     * } else {
     */
    /**
     *     button = <LoginButton onClick={this.handleLoginClick} />;
     */
    /**
     * }
     */

    /**
     * We can rewrie above with ternary operator.
     */
    let button = this.state.isLoggedIn ? (
      <LogoutButton onClick={this.handleLogoutClick} />
    ) : (
      <LoginButton onClick={this.handleLoginClick} />
    )

    return (
      <div>
        <Greeting isLoggedIn={this.state.isLoggedIn} />
        {button}
      </div>
    )
  }
}

/**
 * Conditional rendering: using && operator
 */
function Mailbox(props) {
  const unreadMessages = props.unreadMessages
  return (
    <div>
      <h1>Hello</h1>
      {unreadMessages.length > 0 && (
        /**
         * <===========
         */ <h2>You have {unreadMessages.length} unread messages.</h2>
      )}
    </div>
  )
}

function MailViewer(props) {
  if (!props.message) {
    return null
  }

  return (
    <div>
      <h2>Viewing mail:</h2>
      <h1>{props.message.title}</h1>
      <p>{props.message.content}</p>
    </div>
  )
}

export class MailApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = { unreadMessages: [] }
    this.deleteMessages = this.deleteMessages.bind(this)
    this.receiveMessages = this.receiveMessages.bind(this)
    this.showMessage = this.showMessage.bind(this)
  }

  showMessage() {
    this.setState(prevState => {
      let message = prevState.unreadMessages.pop()
      return { currentMessage: message }
    })
  }

  receiveMessages() {
    this.setState(prevState => {
      let date = new Date()
      let newMessage = {
        title:
          'Your daily digest of time at .' + date.getMilliseconds() + 'ms!',
        content: date.toUTCString(),
      }
      prevState.unreadMessages.push(newMessage)
      return prevState
    })
  }

  deleteMessages() {
    this.setState({ unreadMessages: [] })
  }

  render() {
    const mb = <Mailbox unreadMessages={this.state.unreadMessages} />

    /**
     * MailViewer component initially was added in the way shown below,
     */
    /**
     * using && operator for conditional rendering, but we added this
     */
    /**
     * check inside a component, if message is null, then we return null
     */
    /**
     * from render to prevent component from rendering.
     */
    /**
     * {this.state.currentMessage && <MailViewer message={this.state.currentMessage} />}
     */
    return (
      <div>
        <button onClick={this.receiveMessages}>Receive messages</button>
        <button onClick={this.showMessage}>Show message</button>
        <button onClick={this.deleteMessages}>Delete messages</button>
        {mb}
        <MailViewer message={this.state.currentMessage} />
      </div>
    )
  }
}
