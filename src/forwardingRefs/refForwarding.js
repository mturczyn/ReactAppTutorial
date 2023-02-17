import React, { forwardRef, createRef } from 'react'

/** WARNING
 * For modern React ref forwarding checkout folder "./modern"!
 */

/**
 * ref argument only exists when component is defined
 * with forwardRef React function.
 * Ref forwarding also can be used with class components.
 */
const FancyButton = forwardRef((props, ref) => (
  <button
    ref={ref}
    className='fancy-button'
  >
    {props.children}
  </button>
))

function RefForwardingToDirectChild() {
  const ref = createRef()

  return (
    <div>
      <button onClick={() => ref.current.focus()}>
        Redirect focus to other button
      </button>
      <FancyButton ref={ref}>Click me!</FancyButton>
    </div>
  )
}

/**
 * HOC - Higher order component
 */
function hocLogPropsInvalid(WrappedComponent) {
  class LogProps extends React.Component {
    componentDidMount(prevProps) {
      console.log('old props:', prevProps)
      console.log('new props:', this.props)
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
  return LogProps
}

function RefForwardingToHocChildInvalid() {
  const ref = createRef()
  const HocLogButtonProps = hocLogPropsInvalid(FancyButton)
  return (
    <div className='container-with-border'>
      <p>
        Here we have example that tries to pass ref to higher order component
        (HOC), in which second button is wrapped.
      </p>
      <p style={{ color: 'red' }}>
        This uses only simple ref forwarding used in usual components and will
        result in error!
      </p>
      <button onClick={() => ref.current.focus()}>
        Redirect focus to other button
      </button>
      <HocLogButtonProps ref={ref}>HOC: Click me!</HocLogButtonProps>
    </div>
  )
}

function hocLogPropsCorrect(WrappedComponent) {
  class LogProps extends React.Component {
    componentDidMount(prevProps) {
      console.log('old props:', prevProps)
      console.log('new props:', this.props)
    }

    render() {
      const { forwardRef, ...rest } = this.props
      return (
        <WrappedComponent
          ref={forwardRef}
          {...this.props}
        />
      )
    }
  }
  return LogProps
}

function RefForwardingToHocChildCorrect() {
  const ref = createRef()
  const HocLogButtonProps = hocLogPropsCorrect(FancyButton)
  return (
    <div
      className='container-with-border'
      style={{ backgroundColor: '#AAAAAA' }}
    >
      <p>
        Here we have example that tries to pass ref to higher order component
        (HOC), in which second button is wrapped.
      </p>
      <p style={{ color: 'lightgreen' }}>
        This is correctly passed ref with forwarding.
      </p>
      <button onClick={() => ref.current.focus()}>
        Redirect focus to other button
      </button>
      <HocLogButtonProps forwardRef={ref}>HOC: Click me!</HocLogButtonProps>
    </div>
  )
}

export default function RefForwardingTestArea() {
  return (
    <div>
      <RefForwardingToDirectChild />
      <RefForwardingToHocChildInvalid />
      <RefForwardingToHocChildCorrect />
    </div>
  )
}
