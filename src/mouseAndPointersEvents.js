import React from 'react'
import DocumentTitle from 'react-document-title'

/*
Below class depends on click events to manipulate the page.
It shows dropdown with options depending on 'isOpen' property,
which changes on click events inside browser (on 'widnow' DOM object).
*/
class OuterClickExample extends React.Component {
  constructor(props) {
    super(props)

    this.state = { isOpen: false }
    this.toggleContainer = React.createRef()

    this.onClickHandler = this.onClickHandler.bind(this)
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this)
  }

  componentDidMount() {
    window.addEventListener('click', this.onClickOutsideHandler)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutsideHandler)
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen,
    }))
  }

  onClickOutsideHandler(event) {
    /**
     * console.log(event.target)
     */
    if (
      this.state.isOpen &&
      !this.toggleContainer.current.contains(event.target)
    ) {
      console.log('target not in list, closing popup')
      this.setState({ isOpen: false })
    }
  }

  render() {
    const options = []
    const optionsCount = 5
    for (let i = 0; i < optionsCount; i++) {
      options.push('Option ' + i)
    }

    return (
      <div ref={this.toggleContainer}>
        <button onClick={this.onClickHandler}>Select an option</button>
        {this.state.isOpen && (
          <ul>
            {options.map(x => (
              <li
                style={{
                  border: '1px solid black',
                  margin: '1px',
                  padding: '5px',
                }}
              >
                {x}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

class OuterClickExampleWithBlur extends React.Component {
  constructor(props) {
    super(props)
    this.toggleContainer = React.createRef()
    this.state = { isOpen: false }
    this.timeoutId = null
    this.onClickHandler = this.onClickHandler.bind(this)
    this.onBlurHandler = this.onBlurHandler.bind(this)
    this.onFocusHandler = this.onFocusHandler.bind(this)
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen,
    }))
  }

  onBlurHandler() {
    /**
     * Below lines supposed to help sloving issue that
     */
    /**
     * focus event triggers before blur and clearing timeout does not
     */
    /**
     * work and list is closed anyway.
     */
    /**
     * console.log(this.toggleContainer.current)
     */
    /**
     * console.log('on blur handler fired, closing popup, setting timeout')
     */
    this.timeoutId = setTimeout(() => {
      this.setState({
        isOpen: false,
      })
    }, 1000)
    /**
     * console.log('set timeoutId =', this.timeoutId)
     */
  }

  onFocusHandler(event) {
    /**
     * console.log('component got focus, clearing timeout')
     */
    /**
     * console.log('timeoutId =', this.timeoutId)
     */
    clearTimeout(this.timeoutId)
  }

  render() {
    const options = []
    const optionsCount = 5
    for (let i = 0; i < optionsCount; i++) {
      options.push('Option ' + i)
    }
    return (
      <div
        ref={this.toggleContainer}
        onBlur={this.onBlurHandler}
        onFocus={this.onFocusHandler}
      >
        <button
          onClick={this.onClickHandler}
          aria-haspopup='true'
          aria-expanded={this.state.isOpen}
        >
          Select an option
        </button>
        {this.state.isOpen && (
          <ul>
            {options.map(x => (
              <li
                style={{
                  border: '1px solid black',
                  margin: '1px',
                  padding: '5px',
                }}
              >
                {x}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default function MouseAndPointerEventsTestArea() {
  return (
    <DocumentTitle title='Mouse and pointer events test area'>
      <div>
        <OuterClickExample />
        <OuterClickExampleWithBlur />
      </div>
    </DocumentTitle>
  )
}
