import React, { Component } from "react";
import { Button, ListGroup, ProgressBar, InputGroup } from "react-bootstrap";

export class Trip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.trip.id,
      creator: this.props.trip.creator,
      created_at: this.props.trip.created_at,
      depart_time: this.props.trip.depart_time,
      origin: this.props.trip.origin,
      destination: this.props.trip.destination,
      capacity: this.props.trip.capacity,
      users: this.props.trip.users,
      buttonName: 'Join'
    };
    this.onChangeInfo = this.onChangeInfo.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (this.state.buttonName === 'Join') {
      this.setState({ buttonName: 'Cancel' })
    } else {
      this.setState({ buttonName: 'Join' })
    }

  }

  onChangeInfo(newInfo) {
    this.setState({ body: newInfo.body })
  }

  render() {
    return (

      <ListGroup key={this.props.trip.id} variant="flush">
        <ListGroup.Item>
          <InputGroup>
            <InputGroup.Prepend className="input-group-left">
              <InputGroup.Text id="basic-addon1">{this.state.origin}</InputGroup.Text>
            </InputGroup.Prepend>
            <InputGroup.Prepend className="input-group-right">
              <InputGroup.Text id="basic-addon1">{this.state.destination}</InputGroup.Text>
            </InputGroup.Prepend>
          </InputGroup>
        </ListGroup.Item>

        <ListGroup.Item className="button-holder">
          <Button variant="success">{this.state.buttonName}</Button>{' '}
        </ListGroup.Item>
      </ ListGroup >


    );
  }
}
