import React from 'react';
import ReactDOM from 'react-dom';


/*
React events are named using camelCase, rather than lowercase.
In JSX we pass a function as the event handler, rather than a string:

<button onclick="handle()">
Click me!
</button>

in JSX it looks like:

<button onClick={hanlde}>
Click me!
</button>

When handling events, we call e.preventDefault() explicitly, when we want to prevent
other handlers from triggering by this event:

function handle(e){
    e.preventDefault();
}

NOTE: Here e is SyntheticEvent (to research).
 */

export class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };
        // Required if we are passing a function to a event handler,
        // see the comments inside render method.
        // this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.setState(prevState => ({ isToggleOn: !prevState.isToggleOn }));
        //e.preventDefault();
    }

    render() {
        return (
            // Arrow syntax causes small overhead, but syntatically is most elegant.
            // On the other hand we can use commented version, but we must remember to bind funciton
            // in constructor.
            //<button onClick={this.handleClick}>
            <button onClick={() => this.handleClick()}>
                {this.state.isToggleOn ? "ON" : "OFF"}
            </button>
        )
    }
}