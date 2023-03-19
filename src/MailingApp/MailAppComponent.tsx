import React from 'react'

function UserGreeting(props: any) {
  return (
    <div>
      <b>Welcome!</b>
    </div>
  )
}

function GuestGreeting(props: any) {
  return (
    <div>
      Please, <b>GTFO</b>
    </div>
  )
}

function Greeting(props: any) {
  if (props.isLoggedIn) {
    return UserGreeting(props)
  }

  return GuestGreeting(props)
}

function LoginButton(props: any) {
  return <button onClick={props.onClick}>Login</button>
}

function LogoutButton(props: any) {
  return <button onClick={props.onClick}>Logout</button>
}

export class LoginControl extends React.Component {
  constructor(props: any) {
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
    let button = (this.state as { isLoggedIn: boolean }).isLoggedIn ? (
      <LogoutButton onClick={this.handleLogoutClick} />
    ) : (
      <LoginButton onClick={this.handleLoginClick} />
    )

    return (
      <div>
        <Greeting
          isLoggedIn={(this.state as { isLoggedIn: boolean }).isLoggedIn}
        />
        {button}
      </div>
    )
  }
}

/**
 * Conditional rendering: using && operator
 */
function Mailbox(props: any) {
  const unreadMessages = props.unreadMessages
  return (
    <div>
      <h1>Hello</h1>
      {unreadMessages.length > 0 && (
        <h2>You have {unreadMessages.length} unread messages.</h2>
      )}
    </div>
  )
}

function MailViewer(props: any) {
  const [showRawState, setShowRawState] = React.useState(false)
  if (!props.message) {
    return null
  }

  return (
    <div>
      <h2>Viewing mail: </h2>
      <h1>{props.message.title}</h1>
      <div className='container-with-border'>
        <button onClick={() => setShowRawState(x => !x)}>
          {showRawState ? 'Hide' : 'Show'} raw content
        </button>
        {showRawState && <p>{props.message.content}</p>}
      </div>
      <h4>We advise to pursue following activity today:</h4>
      <div className='container-with-border'>
        <p>
          <b>activity: </b>
          {props.message.activity}
        </p>
        <p>
          <b>type: </b>
          {props.message.type}
        </p>
        <p>
          <b>participants: </b>
          {props.message.participants}
        </p>
        <p>
          <b>price: </b>
          {props.message.price}
        </p>
        <p>
          <b>link: </b>
          {props.message.link}
        </p>
        <p>
          <b>key: </b>
          {props.message.key}
        </p>
        <p>
          <b>accessibility: </b>
          {props.message.accessibility}
        </p>
      </div>
    </div>
  )
}

function MailList(props: any) {
  const unreadMessages = props.unreadMessages

  return (
    <ul>
      {unreadMessages.map((m: any) => (
        <li key={m.title}>
          <h4>{m.title}</h4>
          <p>To add open on click</p>
        </li>
      ))}
    </ul>
  )
}

export class MailApp extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = { unreadMessages: [] }
    this.deleteMessages = this.deleteMessages.bind(this)
    this.receiveMessages = this.receiveMessages.bind(this)
    this.showMessage = this.showMessage.bind(this)
  }

  showMessage() {
    this.setState(prevState => {
      let message = (
        prevState as { unreadMessages: any[] }
      ).unreadMessages.pop()
      return { currentMessage: message }
    })
  }

  receiveMessages() {
    fetch('https://www.boredapi.com/api/activity')
      .then(response => response.json())
      .then(data =>
        this.setState(prevState => {
          let date = new Date()
          let newMessage = {
            title:
              'Your daily digest of time at .' + date.getMilliseconds() + 'ms!',
            content: JSON.stringify(data),
            ...data,
          }
          return {
            unreadMessages: [
              ...(prevState as { unreadMessages: any[] }).unreadMessages,
              newMessage,
            ],
          }
        })
      )
  }

  deleteMessages() {
    this.setState({ unreadMessages: [] })
  }

  render() {
    return (
      <div className='row'>
        <div className='column'>
          <button onClick={this.receiveMessages}>Receive messages</button>
          <button onClick={this.showMessage}>Show message</button>
          <button onClick={this.deleteMessages}>Delete messages</button>
          <Mailbox
            unreadMessages={
              (this.state as { unreadMessages: any[] }).unreadMessages
            }
          />
          <MailViewer
            message={(this.state as { currentMessage: any[] }).currentMessage}
          />
        </div>
        <div className='column'>
          <MailList
            unreadMessages={
              (this.state as { unreadMessages: any[] }).unreadMessages
            }
          />
        </div>
      </div>
    )
  }
}
