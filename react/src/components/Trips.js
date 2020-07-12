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
      created_trips: [],
      joined_trips: [],
      toggleValue: '1'
    }
    this.onJoinTrip = this.onJoinTrip.bind(this);
    this.onCancelTrip = this.onCancelTrip.bind(this);

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
      .then(data => this.setState({
        trips: data.trips,
        created_trips: data.trips.filter((trip) => trip.creator == localStorage.getItem('email')),
        joined_trips: data.trips.filter((trip) => trip.creator == localStorage.getItem('email') || trip.users.includes(localStorage.getItem('email'))),
      }));
  }

  onJoinTrip(trip) {
    this.setState({ joined_trips: [trip, ...this.state.joined_trips] });
  }

  onCancelTrip(trip) {
    this.setState({ joined_trips: this.state.joined_trips.filter(joined_trip => joined_trip.id !== trip.id) });
  }


  render() {
    var tripsList;
    if (this.state.toggleValue === '1') {
      tripsList = this.state.trips;
    } else if (this.state.toggleValue === '2') {
      tripsList = this.state.joined_trips;
    } else if (this.state.toggleValue === '3') {
      tripsList = this.state.created_trips;
    }
    return (
      <div>
        <div className="button-group-holder">
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
        </div>

        {
          tripsList.map(trip => {
            return (
              <Trip
                trip={trip}
                key={trip.id}
                buttonName={trip.buttonName}
                buttonVariant={trip.buttonVariant}
                buttonDisable={trip.buttonDisable}
                onJoinTrip={this.onJoinTrip}
                onCancelTrip={this.onCancelTrip}
              />
            );
          })
        }
      </div >
    );
  };

}