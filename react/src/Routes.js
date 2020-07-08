import React from 'react';
import { Route, Router } from 'react-router-dom';
import { Home } from './Home';
import { Callback } from './Callback';
import { Auth } from './Auth';
import history from './history';
import { Rides } from './components/Rides';
import { MyRides } from './components/MyRides';
import { RideForm } from './components/RideForm';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }
}

const NavBarShare = () => (
    < Navbar bg="light" expand="lg" >
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
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

const Routes = () => (
    <Router history={history} component={Home}>
        <NavBarShare>
            <Route exact path="/posts" render={() => <Rides posts={this.state.posts} />} />
            <Route exact path="/new-post/:userId" component={RideForm} />
            <Route exact path="/my-posts/:userId" component={() => <MyRides myPosts={this.state.myPosts} />} />
            <Route exact path="/" render={(props) => <Home auth={auth} {...props} />} />
            <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
            <Route path="/callback" render={(props) => {
                handleAuthentication(props);
                return <Callback {...props} />
            }} />
        </NavBarShare>
    </Router >
);

export default Routes;
