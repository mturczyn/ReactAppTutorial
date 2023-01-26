import React from 'react';
import ReactDOM from 'react-dom';

/*
** Do not modify state directly **

This won't render component:

this.state.comment = 'Hello';

Instead, useState() should be used:

this.setState({ comment: 'Hello' });

The only place when setting directly state is appropriate is constructor. Besides that,
it won't trigger re-rendering component to match new state.

---
** State updates may be asynchronous **

this.props and this.state can be updated asynchronously, so it's not
recommended to calculate next state based on current this.props and this.state
values, such as:

this.setState( { counter: this.state.counter + this.props.increment, } )

correct, safer alternative is:

this.setState((currentState, props) => { counter: state.counter + props.increment })

which is just overload for setState method accepting delegate to set the state, the delegate
accepts to input parameters: curent state of component and props of component.

---
** State updates are merged **

For example state may contain many variables:

this.state = {
    posts: [],
    comments: []
}

Then, when we try update UI specifying only one variable:

this.setState({ posts: ... })

It will leave comments in tact, untouched, because they wree not specified.
*/

export function setStatelessClockTick() {
    let date = new Date()
    console.log(`rendering timer with date ${date}`);
    ReactDOM.render(
        <StatelessClock date={date} />,
        document.getElementById('rootForTimer')
    )
}

// below component is stateless and is rendered once, and does not update
// So it will display time when it was rendered and never update it.
// That's why we need external timer to drive updates, but that would require
// implementing timer everywhere clock is needed.
export class StatelessClock extends React.Component {
    render() {
        return <div>
            <h1>The time is:</h1>
            <h2>{this.props.date.toLocaleTimeString()}</h2>
            <p>stateless</p>
        </div>
    }
}

// This is stateful component, it manages its state through state property
// and setState method.
// It does not require any additional code for UI updates and can be used as <Clock />.
export class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }

    tick() {
        this.setState({ date: new Date() });
    }

    // Useful method that is called after rendering component, we can
    // set initial state and other stuff related to component.
    componentDidMount() {
        this.timerId = setInterval(() => this.tick(), 1000);
    }

    // Method that is used to cleanup used resources.
    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    render() {
        return <div>
            <h1>The time is:</h1>
            <h2>{this.state.date.toLocaleTimeString()}</h2>
            <p>stateful</p>
        </div>
    }
}
