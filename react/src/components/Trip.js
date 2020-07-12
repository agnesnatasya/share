import React, { Component } from "react";
import { Badge, Button, ListGroup, Card, Accordion, InputGroup } from "react-bootstrap";
import dateFormat from 'dateformat';

export class Trip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.trip.id,
      creator: this.props.trip.creator,
      created_at: this.props.trip.created_at,
      departTime: this.props.trip.depart_time,
      origin: this.props.trip.origin,
      destination: this.props.trip.destination,
      capacity: this.props.trip.capacity,
      users: this.props.trip.users,
      buttonName: this.props.buttonName ? this.props.buttonName : this.props.trip.creator === localStorage.getItem('email') ? 'Created' : this.props.trip.users.includes(localStorage.getItem('email')) ? 'Cancel' : this.props.trip.capacity <= 0 ? 'Full' : 'Join',
      buttonVariant: this.props.buttonVariant ? this.props.buttonVariant : this.props.trip.creator === localStorage.getItem('email') ? 'secondary' : this.props.trip.users.includes(localStorage.getItem('email')) ? 'secondary' : this.props.trip.capacity <= 0 ? 'secondary' : 'success',
      buttonDisable: this.props.buttonDisable ? this.props.buttonDisable : this.props.trip.creator === localStorage.getItem('email') ? true : this.props.trip.users.includes(localStorage.getItem('email')) ? false : this.props.trip.capacity <= 0 ? true : false,
    };
    this.onClick = this.onClick.bind(this);
  }

  async onClick() {
    if (this.state.buttonName === 'Join') {
      await fetch("/join-trip/" + localStorage.getItem('email') + '/' + this.state.id, {
        method: "POST",
      });
      this.setState({ buttonName: 'Cancel', buttonVariant: 'secondary', buttonDisable: false })
      this.props.onJoinTrip(this.state);
    } else {
      await fetch("/quit-trip/" + localStorage.getItem('email') + '/' + this.state.id, {
        method: "POST",
      });
      this.setState({ buttonName: 'Join', buttonVariant: 'success', buttonDisable: false })
      this.props.onCancelTrip(this.state);
    }

  }


  render() {
    return (
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              <InputGroup>
                <InputGroup.Prepend className="input-group-left">
                  <InputGroup.Text id="basic-addon1"><div class="text-wrap">{this.state.origin}</div></InputGroup.Text>
                </InputGroup.Prepend>
                <InputGroup.Prepend className="input-group-middle">
                  <InputGroup.Text id="basic-addon1"><div class="text-wrap">{this.state.destination}</div></InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
            </Accordion.Toggle>

          </Card.Header>

          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <ListGroup horizontal='md'>
                <ListGroup.Item className="info-holder">
                  <Button disabled={true} variant="info" size="sm">
                    Depart time: {dateFormat(this.state.departTime, "mmmm dS, yyyy HH:MM")}
                  </Button> {' '}
                  <br />
                  <Badge variant="info" size="sm"><div class="text-wrap">Contact: {this.state.creator}</div></Badge>
                </ListGroup.Item>

                <ListGroup.Item className="button-holder">
                  <Button variant={this.state.buttonVariant} disabled={this.state.buttonDisable} onClick={this.onClick}>{this.state.buttonName}</Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion >
    );
  }
}
