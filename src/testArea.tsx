import React, { useRef } from 'react'
import { Clock, setStatelessClockTick } from './componentLifecycle.js'
import { Toggle } from './events.js'
import { LoginControl, MailApp } from './conditionalRendering.js'
import { DoubledNumbers } from './listsAndKeys.js'
import FormsTestArea from './forms.js'
import { useNavigate } from 'react-router-dom'
import Calculator from './liftingStateUp.js'
import CompositionAndInheritanceTestArea from './compositionAndInheritance.js'

/**
 * The below two components are equivalent from React’s point of view.
 */
/**
 * First one is so called function component.
 */
export function Welcome(props: any) {
  return <h1>Hello, {props.name}</h1>
}

export class WelcomeClass extends React.Component<{ name: string }> {
  render() {
    return <h1> Hello, {(this.props as { name: string }).name}</h1>
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

export class Avatar extends React.Component<{
  user: { name: string; avatarUrl: string }
}> {
  render() {
    return (
      <div>
        <img
          alt='This is user'
          height='100rem'
          src={(this.props as { user: { avatarUrl: string } }).user.avatarUrl}
        />
        <p>This is: {(this.props as { user: { name: string } }).user.name}</p>
      </div>
    )
  }
}

export function UserProfile(props: {
  user: { name: string; avatarUrl: string }
  description: string
}) {
  const [numberOfAvatars, setNumberOfAvatars] = React.useState(1)
  const avatars = []
  for (let i = 0; i < numberOfAvatars; i++) {
    avatars.push(<Avatar user={props.user} />)
  }
  return (
    <div style={{ border: '5px solid red' }}>
      <h2>{props.description}</h2>
      <button onClick={() => setNumberOfAvatars(x => x + 1)}>Add avatar</button>
      <button onClick={() => setNumberOfAvatars(x => x - 1)}>
        Remove avatar
      </button>
      {avatars}
    </div>
  )
}

export function TestAreaMainPage(props: any) {
  const timerIdRef = useRef<any>(null)

  const startStatelessClock = () => {
    console.log('>>> clearing interval: ', timerIdRef)
    timerIdRef.current = setInterval(setStatelessClockTick, 1000)
  }

  const navigate = useNavigate()
  const nav = (path: string) => {
    if (timerIdRef.current) {
      console.log('>>> clearing interval: ', timerIdRef)
      clearInterval(timerIdRef.current)
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
      <div className='container-with-border main-nav-bar'>
        {props.availablePages.map((x: any) => (
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
