import React from 'react'

/*
To make website more accessible it's good to pair label with input
with use of 'for' attribute of 'label' element. In JSX it's 'htmlFor'
*/

function LabelledFormInput() {
  return (
    <>
      <label htmlFor='namedInput'>Name:</label>
      <input
        id='namedInput'
        type='text'
        name='name'
      />
    </>
  )
}

/**
 * PROGRAMMATICALLY MANAGING FOCUS
 *
 * Passing ref down to child component
 *
 * function CustomTextInput(props) {
 *   return (
 *     <div>
 *       <input ref={props.inputRef} />
 *     </div>
 *   );
 * }
 *
 * class Parent extends React.Component {
 *   constructor(props) {
 *     super(props);
 *     this.inputElement = React.createRef();
 *   }
 *   render() {
 *     return (
 *       <CustomTextInput inputRef={this.inputElement} />
 *     );
 *   }
 * }
 *
 * Now you can set focus when required.
 *
 * this.inputElement.current.focus();
 */

class FocusedFormInput extends React.Component {
  constructor(props) {
    super(props)
    /**
     * Use the `ref` callback to store a reference to the text input DOM
     * element in an instance field (for example, this.textInput).
     */
    this.textInput = React.createRef()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    e.preventDefault()
    /**
     * Explicitly focus the text input using the raw DOM API
     * Note: we're accessing "current" to get the DOM node
     */
    this.textInput?.current.focus()
  }

  render() {
    return (
      <>
        <input
          type='text'
          ref={this.textInput}
        />
        <button onClick={this.handleClick}>Focus input</button>
      </>
    )
  }
}

export function AccessibilityTestArea() {
  return (
    <form>
      <LabelledFormInput />
      <FocusedFormInput />
    </form>
  )
}
