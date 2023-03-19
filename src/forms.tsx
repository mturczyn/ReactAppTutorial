import React from 'react'

function StandardForm(props) {
  return (
    <form>
      <h3>Standard form</h3>
      <label>
        Name:
        <input
          type='text'
          name='name'
        />
      </label>
      <input
        type='submit'
        value='Submit'
      />
    </form>
  )
}

/*
Above form has the default HTML form behavior of browsing to a new page when the user submits the form. 
If you want this behavior in React, it just works. But in most cases, it's convenient to have a JavaScript 
function that handles the submission of the form and has access to the data that the user entered into the 
form. The standard way to achieve this is with a technique called "CONTROLLED COMPONENTS".
*/

/**
 * Here is above form, but controlled.
 */
/**
 * Now React component state is source of truth for form.
 */
/**
 * It is totally driven with state of below ConrolledForm.
 */
class ControlledForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value)
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Controlled form</h3>
        <label>
          Name:
          <input
            type='text'
            name='name'
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input
          type='submit'
          value='Submit'
        />
      </form>
    )
  }
}

class EssayForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'Please wirte an essay about your favorite DOM element.',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value)
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Essay controlled form</h3>
        <label>
          Essay:
          <textarea
            style={{ margin: '0 10px' }}
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input
          style={{ margin: '20px 0' }}
          type='submit'
          value='Submit'
        />
      </form>
    )
  }
}

class FormWithSelect extends React.Component<any, { value: string }> {
  constructor(props: any) {
    super(props)
    this.state = { value: 'coconut' }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event: any) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event: any) {
    alert('Picked option is: ' + this.state.value)
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Form with select element</h3>
        <label>
          Pick your favorite flavor:
          <select
            value={this.state.value}
            onChange={this.handleChange}
          >
            <option value='grapefruit'>Grapefruit</option>
            <option value='coconut'>Coconut</option>
          </select>
        </label>
        <input
          type='submit'
          value='Submit'
        />
      </form>
    )
  }
}

/**
 * File input
 */
/**
 * <input type="file" />
 */
/**
 * is UNCONTROLLED component, because it's value is readonly.
 */

class MultipleInputForm extends React.Component<
  any,
  { isGoing: boolean; numberOfGuests: string }
> {
  constructor(props: any) {
    super(props)
    this.state = {
      isGoing: true,
      numberOfGuests: 2,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleSubmit(event: any) {
    alert(JSON.stringify(this.state))
    event.preventDefault()
  }

  handleInputChange(event: any) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    /**
     * This will set either isGoing proeprty or numberOfGuests
     */
    /**
     * We could also extract names to variables and use them conveniently.
     */
    this.setState({
      [name]: value,
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Multiple inputs form</h3>
        <label>
          Is going:
          <input
            name='isGoing'
            type='checkbox'
            checked={this.state.isGoing}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name='numberOfGuests'
            type='number'
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <input
          type='submit'
          value='Submit'
        />
      </form>
    )
  }
}

function NullValueOnControlledInput(props: any) {
  return (
    <form>
      <h3>Null value in controlled input</h3>
      <p>First input is defined to value, second is set to null</p>
      <input value='hi' />
      <input value={null} />
    </form>
  )
}

function FormsTestArea(props: any) {
  return (
    <div>
      <h1>Forms testing area</h1>
      <StandardForm />
      <ControlledForm />
      <EssayForm />
      <FormWithSelect />
      <MultipleInputForm />
      <NullValueOnControlledInput />
    </div>
  )
}

export default FormsTestArea
