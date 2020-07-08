import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Rides } from './components/Rides';
import { NavBar } from './components/NavBar';
import { Route, Redirect } from 'react-router-dom';
import { Container, Header, Button, Grid, Menu } from 'semantic-ui-react';

const HeaderMenu = () => (
  <Menu text style={{ background: 'teal', margin: 0, marginBottom: 10 }}>
    <Container>
      <Menu.Item
        as='h1'
        content='Car Share'
        style={{
          color: 'white',
          fontSize: '3em',
          textAlign: 'center',
          fontWeight: 'normal',
          margin: 0,
        }}
      />
    </Container>
  </Menu>
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    props.match.params.userId == rest.userId
      ? <Component {...rest} />
      : <Redirect to={{
        pathname: '/',
        state: { onChangeUserId: rest.onChangeUserId }
      }} />
  )} />
)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myRides: [],
      rides: [],
      userId: 0,
    };
    this.changeUserId = this.changeUserId.bind(this);
    this.changeRides = this.changeRides.bind(this);
    this.changeMyRides = this.changeMyRides.bind(this);
  }

  changeUserId(newUserId) {
    this.setState({
      userId: newUserId
    });
  }

  changeRides(newRides) {
    this.setState({
      rides: newRides
    });
  }

  changeMyRides(newRides) {
    this.setState({
      myRides: newRides
    });
  }

  render() {
    return (
      <div>
        <HeaderMenu />
        <Grid container style={{ height: '100vh' }}>
          <Grid.Column width={3} fluid>
            <NavBar userId={this.state.userId} rides={this.state.rides} onChangeRides={this.changeRides} onChangeMyRides={this.changeMyRides} />
          </Grid.Column>
          <Grid.Column width={13}>
            <Container>
              <Rides rides={this.state.rides} />
            </Container>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;





