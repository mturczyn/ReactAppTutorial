import React, { forwardRef, createRef } from 'react'

/** WARNING
 * For modern React ref forwarding checkout folder "./modern"!
 */

/**
 * ref argument only exists when component is defined
 * with forwardRef React function.
 * Ref forwarding also can be used with class components.
 */
const FancyButton = forwardRef((props: any, ref: any) => (
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
      <button onClick={() => (ref.current as any).focus()}>
        Redirect focus to other button
      </button>
      <FancyButton ref={ref}>Click me!</FancyButton>
    </div>
  )
}

/**
 * HOC - Higher order component - more on that in separate page focused on HOCs.
 */
function hocLogPropsInvalid(WrappedComponent: any): any {
  class LogProps extends React.Component {
    componentDidMount() {
      // After enabling TypeScript, it turned out this method does
      // not have prevProps params.
      //console.log('old props:', prevProps)
      console.log('new props:', this.props)
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
  return LogProps
}

const HocLogButtonPropsInvalid = hocLogPropsInvalid(FancyButton)

function RefForwardingToHocChildInvalid() {
  const ref = createRef()
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
      <button onClick={() => (ref.current as any).focus()}>
        Redirect focus to other button
      </button>
      {/* Here ref will point to LogProps instead of the inner FancyButton component.
      This means we can't call e.g. ref.current.focus() */}
      <HocLogButtonPropsInvalid ref={ref}>
        HOC: Click me!
      </HocLogButtonPropsInvalid>
    </div>
  )
}

function hocLogPropsCorrect(WrappedComponent: any) {
  class LogProps extends React.Component {
    componentDidMount() {
      //console.log('old props:', prevProps)
      console.log('new props:', this.props)
    }

    render() {
      const { forwardRef, ...rest } = this.props as { forwardRef: any }
      return (
        <WrappedComponent
          ref={forwardRef}
          {...this.props}
        />
      )
    }
  }
  return forwardRef<any, any>((props, ref) => (
    <LogProps
      {...props}
      forwardRef={ref}
    />
  ))
}

const HocLogButtonPropsValid = hocLogPropsCorrect(FancyButton)

function RefForwardingToHocChildCorrect() {
  const ref = createRef()
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
      <button onClick={() => (ref.current as any).focus()}>
        Redirect focus to other button
      </button>
      <HocLogButtonPropsValid ref={ref}>HOC: Click me!</HocLogButtonPropsValid>
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
