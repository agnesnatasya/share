import React, { Component } from "react";
import { Ride } from './Ride.js';
import { Grid } from "semantic-ui-react";

export class Rides extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rides: []
    }
  }

  componentDidMount() {
    fetch('/posts')
      .then(response => response.json())
      .then(data => this.setState({ rides: data.posts }));
  }

  render() {
    return (
      <Grid divided='vertically' >
        {
          this.state.rides.map(ride => {
            return (
              <Ride ride={ride} key={ride.rideid} />
            );
          })
        }
      </Grid>
    );
  };

}