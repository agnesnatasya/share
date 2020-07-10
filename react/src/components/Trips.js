import React, { Component } from "react";
import { Trip } from './Trip.js';
import { ButtonGroup, ToggleButton } from "react-bootstrap";

const toggles = [
  { name: 'All', value: '1' },
  { name: 'Joined Trips', value: '2' },
  { name: 'Created Trips', value: '3' },
];

export class Trips extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      toggleValue: '1'
    }
  }

  buttons = () => (
    <ButtonGroup toggle>
      {toggles.map((toggle, idx) => (
        <ToggleButton
          key={idx}
          type="radio"
          variant="secondary"
          name="radio"
          value={toggle.value}
          checked={this.state.toggleValue === toggle.value}
          onChange={(e) => this.setState({ toggle: e.currentTarget.value })}
        >
          {toggle.name}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );


  componentDidMount() {
    fetch('/trips/' + localStorage.getItem('email'))
      .then(response => response.json())
      .then(data => this.setState({ trips: data.trips }));
  }

  render() {
    let tripsList = this.state.trips;

    if (this.state.toggleValue == '2') {
      tripsList = tripsList.filter((trip) => trip.join || trip.creator == localStorage.getItem('email'))
    }

    if (this.state.toggleValue == '3') {
      console.log(this.props.email)
      tripsList = tripsList.filter((trip) => trip.creator == localStorage.getItem('email'))
    }

    return (
      <div>
        <ButtonGroup toggle>
          {toggles.map((toggle, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="light"
              name="radio"
              value={toggle.value}
              checked={this.state.toggleValue === toggle.value}
              onChange={(e) => this.setState({ toggleValue: e.currentTarget.value })}
            >
              {toggle.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
        {
          tripsList.map(trip => {
            return (
              <Trip trip={trip} key={trip.id} />
            );
          })
        }
      </div >
    );
  };

}