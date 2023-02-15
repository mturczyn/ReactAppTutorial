import React, { useState } from 'react'
import { Clock, setStatelessClockTick } from './componentLifecycle.js'
import { Toggle } from './events.js'
import { LoginControl, MailApp } from './conditionalRendering.js'
import { DoubledNumbers } from './listsAndKeys.js'
import FormsTestArea from './forms.js'
import { useNavigate } from 'react-router-dom'
import Calculator from './liftingStateUp.js'
import CompositionAndInheritanceTestArea from './compositionAndInheritance.js'
import { TestTreeSelect } from './CustomTreeSelect/TestTreeSelect'
import ControlledTreeSelect from './CustomTreeSelect/ControlledTreeSelect.js'

/**
 * The below two components are equivalent from React’s point of view.
 */
/**
 * First one is so called function component.
 */
export function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}

export class WelcomeClass extends React.Component {
  render() {
    return <h1> Hello, {this.props.name}</h1>
  }
}

/**
 * React component names should start with uppercase, as React engine treats lowercase starting elements to be HTML tags.
 */
/**
 * Below element will never be rendered correctly by React.
 */
export class wrongNamed extends React.Component {
  render() {
    return <p>should not be possible</p>
  }
}

export class Avatar extends React.Component {
  render() {
    return (
      <div align='center'>
        <img
          height='100rem'
          src={this.props.user.avatarUrl}
        />
        <p>This is: {this.props.user.name}</p>
      </div>
    )
  }
}

export class UserProfile extends React.Component {
  render() {
    return (
      <div style={{ border: '5px solid red' }}>
        <h2>{this.props.description}</h2>
        <Avatar user={this.props.user} />
      </div>
    )
  }
}

export function TestAreaMainPage(props) {
  const [statelessClockTimerId, setStatelessClockTimerId] = useState(0)
  const startStatelessClock = () => {
    setStatelessClockTimerId(setInterval(setStatelessClockTick, 1000))
  }

  const navigate = useNavigate()
  const nav = path => {
    if (path === 'MailingApp') {
      console.log('>> clearing interval: ', statelessClockTimerId)
      clearInterval(statelessClockTimerId)
    }

    navigate(path)
  }

  const user = {
    avatarUrl: 'exampleAvatar.png',
    name: 'Michal',
  }

  const numbers = [1, 2, 3.14, -1001, -100]

  const createNavigationBar = () => {
    if (!props.availablePages) {
      return null
    }
    return (
      <div className='container-with-border'>
        {props.availablePages.map(x => (
          <button
            style={{ padding: '0.5rem', margin: '0.5rem' }}
            onClick={() => nav(x.path)}
          >
            Open {x.path}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div>
      {createNavigationBar()}
      <Welcome name='Michal - function component' />
      <WelcomeClass name='Michal - class extending React component' />
      <UserProfile
        user={user}
        description='example user profile'
      />
      <Clock />
      <div id='rootForStatelessClock'>
        <button onClick={startStatelessClock}>Start stateless clock</button>
      </div>
      <Toggle />
      <LoginControl />
      <MailApp />
      <DoubledNumbers numbers={numbers} />
      <FormsTestArea />
      <Calculator />
      <CompositionAndInheritanceTestArea />
      {/* <ControlledTreeSelect /> */}
    </div>
  )
}
