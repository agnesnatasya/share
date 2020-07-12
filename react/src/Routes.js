import React, { useState } from 'react';
import { Route, Router } from 'react-router-dom';
import { Home } from './Home';
import { Callback } from './Callback';
import { Auth } from './Auth';
import history from './history';
import { Trips } from './components/Trips';
import { TripForm } from './components/TripForm';
import { Navbar, Nav, Button, Form } from 'react-bootstrap';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }
}




const Routes = () => {
    const { isAuthenticated } = auth;
    const [checkAuthenticated, setCheckAuthenticated] = useState(isAuthenticated());
    const logoutProcess = () => {
        auth.logout();
        setCheckAuthenticated(false);
    }
    const NavBarShare = () => (
        < Navbar bg="light" expand="lg" >
            <Navbar.Brand href="#home">TRIP SHARE</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/new-trip">New Trip</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Form inline>
                <Button onClick={logoutProcess}>Log Out</Button>
            </Form>

        </Navbar >
    )

    return (
        <Router history={history} component={Home}>
            {checkAuthenticated && <NavBarShare />}
            <Route exact path="/trips" render={(props) => <Trips auth={auth} {...props} />} />
            <Route exact path="/new-trip" component={TripForm} />
            <Route exact path="/" render={(props) => <Home auth={auth} {...props} />} />
            <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
            <Route path="/callback" render={(props) => {
                handleAuthentication(props);
                setCheckAuthenticated(true);
                return <Callback {...props} />
            }} />
        </Router >
    );
}

export default Routes;
