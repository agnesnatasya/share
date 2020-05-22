import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { SignUp } from './components/SignUp';
import { RegisterForm } from './components/RegisterForm';
import { NavBar } from './components/NavBar';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myOrders:[],
      orders: [],
      userId: 0,
    };
    this.changeUserId = this.changeUserId.bind(this);
    this.changeOrders = this.changeOrders.bind(this);
    this.changeMyOrders = this.changeMyOrders.bind(this);
  }

  changeUserId(newUserId) {
    this.setState({
      userId: newUserId
    });
  }

  changeOrders(newOrders) {
    this.setState({
      orders: newOrders
    });
  }

  changeMyOrders(newOrders) {
    this.setState({
      myOrders: newOrders
    });
  }

  render() {
    return (
      <Container style={{ marginTop: 40 }}>
        <NavBar userId={this.state.userId} orders={this.state.orders} onChangeOrders={this.changeOrders} onChangeMyOrders={this.changeMyOrders} />
        <Route exact path="/login" render={() => <RegisterForm onChange={this.changeUserId} onChangeOrders={this.changeOrders} onChangeMyOrders={this.changeMyOrders} />} />
        <Route exact path="/sign-up" component={SignUp} />
      </Container>
    );
  }
}

export default App;


  

 
