import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Rides } from './components/Rides';
import { NavBar } from './components/NavBar';
import { Route, Redirect } from 'react-router-dom';
import { Container, Header, Button, Grid, Menu } from 'react-bootstrap';

class App extends Component {

  render() {
    return (
      <div>
        <Rides />
      </div>
    );
  }
}

export default App;





