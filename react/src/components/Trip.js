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
      buttonName: 'Join',
      buttonVariant: 'success'
    };
    this.onClick = this.onClick.bind(this);
  }

  async onClick() {
    if (this.state.buttonName === 'Join') {
      await fetch("/join-trip/" + localStorage.getItem('email') + '/' + this.state.id, {
        method: "POST",
      });
      this.setState({ buttonName: 'Cancel', buttonVariant: 'secondary' })
    } else {
      await fetch("/quit-trip/" + localStorage.getItem('email') + '/' + this.state.id, {
        method: "POST",
      });
      this.setState({ buttonName: 'Join', buttonVariant: 'success' })
    }

  }


  render() {
    return (
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <InputGroup>
              <InputGroup.Prepend className="input-group-left">
                <InputGroup.Text id="basic-addon1"><div class="text-wrap">{this.state.origin}</div></InputGroup.Text>
              </InputGroup.Prepend>
              <InputGroup.Prepend className="input-group-middle">
                <InputGroup.Text id="basic-addon1"><div class="text-wrap">{this.state.destination}</div></InputGroup.Text>
              </InputGroup.Prepend>
              <InputGroup.Prepend className="input-group-right">
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  <div class="text-wrap">Details..</div>
                </Accordion.Toggle>
              </InputGroup.Prepend>
            </InputGroup>
          </Card.Header>

          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <ListGroup horizontal>
                <ListGroup.Item className="info-holder">
                  <Button disabled={true} variant="info" size="sm">
                    Depart time: {dateFormat(this.state.departTime, "mmmm dS, yyyy HH:MM")}
                  </Button> {' '}
                  <Button disabled={true} variant="info" size="sm">Driver: {this.state.creator}</Button>
                </ListGroup.Item>

                <ListGroup.Item className="button-holder">
                  <Button
                    variant={this.state.buttonVariant}
                    onClick={this.onClick}
                  >{this.state.buttonName}</Button>{' '}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion >
    );
  }
}
