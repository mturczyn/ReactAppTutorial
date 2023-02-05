import React from "react";
import { Clock, setStatelessClockTick } from "./componentLifecycle.js";
import { Toggle } from "./events.js";
import { LoginControl, MailApp } from './conditionalRendering.js'
import { DoubledNumbers } from "./listsAndKeys.js";
import FormsTestArea from "./forms.js";
import { useNavigate } from 'react-router-dom'
import Calculator from "./liftingStateUp.js";
import CompositionAndInheritanceTestArea from "./compositionAndInheritance.js";

// The below two components are equivalent from React’s point of view.
// First one is so called function component.
export function Welcome(props) {
    return <h1>Hello, {props.name}</h1>
}

export class WelcomeClass extends React.Component {
    render() {
        return <h1> Hello, {this.props.name}</h1>
    }
}

// React component names should start with uppercase, as React engine treats lowercase starting elements to be HTML tags.
// Below element will never be rendered correctly by React.
export class wrongNamed extends React.Component {
    render() {
        return (
            <p>should not be possible</p>
        )
    }
}

export class Avatar extends React.Component {
    render() {
        return (
            <div align='center'>
                <img height="100rem" src={this.props.user.avatarUrl} />
                <p>This is: {this.props.user.name}</p>
            </div>
        )
    }
}

export class UserProfile extends React.Component {
    render() {
        return (
            <div style={{ border: '5px solid red' }}>
                <h2>{this.props.description}</h2>
                <Avatar user={this.props.user} />
            </div>
        )
    }
}

export function TestArea(props) {
    const navigate = useNavigate();
    const statelessClockTimerId = setInterval(setStatelessClockTick, 1000);
    const nav = () => {
        clearInterval(statelessClockTimerId);
        navigate('MailingApp');
    }

    const user = {
        avatarUrl: "exampleAvatar.png",
        name: "Michal",
    }

    const numbers = [1, 2, 3.14, -1001, -100];

    return (
        <div>
            <button onClick={nav}>Open mailing app</button>
            <Welcome name="Michal - function component" />
            <WelcomeClass name="Michal - class extending React component" />
            <UserProfile user={user} description='example user profile' />
            <Clock />
            <div id="rootForStatelessClock"></div>
            <Toggle />
            <LoginControl />
            <MailApp />
            <DoubledNumbers numbers={numbers} />
            <FormsTestArea />
            <Calculator />
            <CompositionAndInheritanceTestArea />
        </div>
    )
}