import React from "react";

function StandardForm(props) {
    return (
        <div>
            <h3>Standard form</h3>
            <form>
                <label>
                    Name:
                    <input type="text" name="name" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

/*
Above form has the default HTML form behavior of browsing to a new page when the user submits the form. 
If you want this behavior in React, it just works. But in most cases, it's convenient to have a JavaScript 
function that handles the submission of the form and has access to the data that the user entered into the 
form. The standard way to achieve this is with a technique called "CONTROLLED COMPONENTS".
*/

// Here is above form, but controlled.
// Now React component state is source of truth for form.
// It is totally driven with state of below ConrolledForm.
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
            <div>
                <h3>Controlled form</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="name" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

class EssayForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "Please wirte an essay about your favorite DOM element."
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
            <div>
                <h3>Essay controlled form</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Essay:
                        <textarea value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type='submit' value='Submit' />
                </form>
            </div>
        )
    }
}

class FormWithSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = { value: 'coconut' }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({ value: event.target.value })
    }

    handleSubmit(event) {
        alert('Picked option is: ' + this.state.value)
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <h3>Form with select element</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Pick your favorite flavor:
                        <select value={this.state.value} onChange={this.handleChange}>
                            <option value="grapefruit">Grapefruit</option>
                            <option value="coconut">Coconut</option>
                        </select>
                    </label>
                    <input type='submit' value='Submit' />
                </form>
            </div>
        )
    }
}

function FormsTestArea(props) {
    return (
        <div>
            <h1>Forms testing area</h1>
            <StandardForm />
            <ControlledForm />
            <EssayForm />
            <FormWithSelect />
        </div>
    )
}

export default FormsTestArea;