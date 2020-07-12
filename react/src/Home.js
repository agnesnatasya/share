import React, { Component } from 'react';
import { Trips } from './components/Trips';

export class Home extends Component {
    // calls the login method in authentication service
    login = () => {
        this.props.auth.login();
    }
    // calls the logout method in authentication service
    logout = () => {
        this.props.auth.logout();
    }
    render() {
        // calls the isAuthenticated method in authentication service
        const { isAuthenticated } = this.props.auth;
        return (
            <div>
                {
                    isAuthenticated() &&
                    <div className="container column">
                        <Trips auth={this.props.auth} />
                    </div>
                }
                {
                    !isAuthenticated() && (
                        <div className="container column">
                            <h5>
                                You are not logged in! Please{' '}
                                <a
                                    style={{ cursor: 'pointer' }}
                                    onClick={this.login}
                                >
                                    Log In
                </a>
                                {' '}to continue.
              </h5>
                        </div>
                    )
                }
            </div>
        );
    }
}
