import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import DateTimePicker from 'react-datetime-picker';

export const TripForm = ({ userId }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [capacity, setCapacity] = useState("");
  const [departTimeFormat, setDepartTimeFormat] = useState(new Date())

  return (
    <Container>
      <h1>Create a new Trip!</h1>
      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Origin
        </Form.Label>
        <Col sm="10">
          <Form.Control
            placeholder="From here.."
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Destination
        </Form.Label>
        <Col sm="10">
          <Form.Control
            placeholder="To here.."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Capacity
        </Form.Label>
        <Col sm="10">
          <Form.Control
            placeholder="Number of seats left"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Capacity
        </Form.Label>
        <Col sm="10">
          <DateTimePicker
            variant="round"
            value={departTimeFormat}
            onChange={setDepartTimeFormat}
          />
        </Col>
      </Form.Group>
      <Button
        onClick={async () => {
          const createdAt = new Date().getTime();
          const departTime = departTimeFormat.getTime();
          const trip = { createdAt, departTime, origin, destination, capacity };
          const response = await fetch("/new-trip/" + localStorage.getItem('email'), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(trip),
          });

          if (response.ok) {
            console.log("response worked");
            setOrigin("");
            setDestination("");
            setCapacity("");
            setDepartTimeFormat(new Date())
          }
        }}
      >
        Submit
          </Button>
    </Container >
  );
};

