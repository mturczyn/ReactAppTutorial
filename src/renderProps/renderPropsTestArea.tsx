import React, { useRef } from 'react'

export default function RenderPropsTestArea() {
  return (
    <div>
      <DogMouseTracker />
      <MouseTracker />
    </div>
  )
}

class MouseTracker extends React.Component<any, { x: number; y: number }> {
  constructor(props: any) {
    super(props)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.state = { x: 0, y: 0 }
  }

  handleMouseMove(event: { clientX: number; clientY: number }) {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    })
  }

  render() {
    return (
      <div
        style={{ height: '100vh' }}
        onMouseMove={this.handleMouseMove}
      >
        <h1>Move mouse around!</h1>
        <p>
          The current mouse position is ({this.state.x}, {this.state.y})
        </p>
      </div>
    )
  }
}

// The problem: how can we use this behavior in other component?
// Let's try to tackle that by refactoring above code.
class Mouse extends React.Component<any, { x: number; y: number }> {
  constructor(props: any) {
    super(props)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.state = { x: 0, y: 0 }
  }

  handleMouseMove(event: { clientX: number; clientY: number }) {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    })
  }

  render() {
    return (
      <div
        style={{ height: '100vh' }}
        onMouseMove={this.handleMouseMove}
      >
        {this.props.render(this.state)}
        <p>
          The current mouse position is ({this.state.x}, {this.state.y})
        </p>
      </div>
    )
  }
}

function Dog(props: any) {
  const imgRef = useRef<any>(null)
  const left = props.mouse.x - (imgRef.current?.width ?? 0) / 2
  const top = props.mouse.y - (imgRef.current?.height ?? 0) / 2
  return (
    <img
      ref={imgRef}
      src='dog.jfif'
      style={{
        position: 'absolute',
        left: left,
        top: top,
        height: '50vh',
      }}
    />
  )
}

function DogMouseTracker() {
  return (
    <div>
      <Mouse render={(mouse: any) => <Dog mouse={mouse} />} />
    </div>
  )
}
