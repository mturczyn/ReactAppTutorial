import React from "react";
import { Clock } from "./componentLifecycle.js";

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

// React component names should start with uppercase, as React engine treats lowercase starting elements to be HTMK tags.
// Below element will never be rendered correctly by React.
export class wrongNamed extends React.Component {
    render() {
        return <p>should not be possible</p>
    }
}

export class Avatar extends React.Component {
    render() {
        return <div align='center'>
            <img height="100rem" src={this.props.user.avatarUrl} />
            <p>This is: {this.props.user.name}</p>
        </div>
    }
}

export class UserProfile extends React.Component {
    render() {
        return <div style={{ border: '5px solid red' }}>
            <h2>{this.props.description}</h2>
            <Avatar user={this.props.user} />
        </div>
    }
}

export class TestArea extends React.Component {
    render() {
        const user = {
            avatarUrl: "exampleAvatar.png",
            name: "Michal"
        };

        const fc = <Welcome name="Michal - function component" />
        const cc = <WelcomeClass name="Michal - class extending React component" />
        return <div>{fc}{cc}<UserProfile user={user} description='example user profile' /><Clock /></div>
    }
}