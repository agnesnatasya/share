import React from 'react';
import { Route, Router } from 'react-router-dom';
import { Home } from './Home';
import { Callback } from './Callback';
import { Auth } from './Auth';
import history from './history';
import { Trips } from './components/Trips';
import { TripForm } from './components/TripForm';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }
}

const NavBarShare = () => (
    < Navbar bg="light" expand="lg" >
        <Navbar.Brand href="#home">Trip Share</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/new-trip">New Trip</Nav.Link>
                <Nav.Link href="/my-trips">My Trips</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
    </Navbar >
)
const { isAuthenticated } = auth;

const Routes = () => (
    <Router history={history} component={Home}>
        {isAuthenticated() && <NavBarShare />}
        <Route exact path="/trips" render={(props) => <Trips auth={auth} {...props} />} />
        <Route exact path="/new-trip" component={TripForm} />
        <Route exact path="/" render={(props) => <Home auth={auth} {...props} />} />
        <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
        <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />
        }} />
    </Router >
);

export default Routes;
