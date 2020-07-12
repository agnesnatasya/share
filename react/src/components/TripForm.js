import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Toast, Card } from "react-bootstrap";
import DateTimePicker from 'react-datetime-picker';

export const TripForm = ({ userId }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [capacity, setCapacity] = useState("");
  const [departTimeFormat, setDepartTimeFormat] = useState(new Date())
  const [errors, setErrors] = useState({
    'origin': 'Origin cannot be empty!',
    'destination': 'Destination cannot be empty!',
    'capacity': 'Capacity cannot be empty!',
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState("")

  const [touched, setTouched] = useState({
    'origin': false,
    'destination': false,
    'capacity': false
  });

  const successMessage = () => (
    <Toast>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
        <strong className="mr-auto">Bootstrap</strong>
        <small>11 mins ago</small>
      </Toast.Header>
      <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
    </Toast>
  );

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    switch (name) {
      case 'origin':
        setOrigin(value)
        errors.origin =
          value.length <= 0
            ? 'Origin cannot be empty!'
            : '';
        break;
      case 'destination':
        setDestination(value)
        errors.destination =
          value.length <= 0
            ? 'Destination cannot be empty!'
            : '';
        break;
      case 'capacity':
        setCapacity(value)
        console.log(parseInt(value))
        errors.capacity =
          value.length <= 0
            ? 'Capacity cannot be empty!'
            :
            parseInt(value) != parseInt(value)
              ? 'Capacity should be a number'
              : '';
        break;
      default:
        break;
    }
  }

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }

  const shouldMarkError = (field) => {
    const hasError = errors[field];
    const shouldShow = touched[field];
    return hasError ? shouldShow : false;
  };

  const handleBlur = (field) => (evt) => {
    setTouched({ ...touched, [field]: true })
  }

  return (
    <div>
      {showSuccessMessage ? (
        <Toast>
          <Toast.Body>Trip created successfully!</Toast.Body>
        </Toast>
      )
        :
        <Toast className="hiddenToast">
          <Toast.Body>Hidden Message</Toast.Body>
        </Toast>}
      <Container>
        <Card className="form-card">
          <Card.Body>
            <h1>Create a new Trip!</h1>
            <Form.Group as={Row}>
              <Form.Label column lg="2">
                Origin
        </Form.Label>
              <Col lg="10">
                <Form.Control
                  className={shouldMarkError('origin') ? "error" : ""}
                  onBlur={handleBlur('origin')}
                  placeholder="From here.."
                  value={origin}
                  name='origin'
                  onChange={handleChange}
                />
                <p className="errorMessage">{shouldMarkError('origin') ? errors.origin : ""}</p>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column lg="2">
                Destination
        </Form.Label>
              <Col lg="10">
                <Form.Control
                  className={shouldMarkError('destination') ? "error" : ""}
                  onBlur={handleBlur('destination')}
                  placeholder="To here.."
                  value={destination}
                  name='destination'
                  onChange={handleChange}
                />
                <p className="errorMessage">{shouldMarkError('destination') ? errors.destination : ""}</p>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column lg="2">
                Capacity
        </Form.Label>
              <Col lg="10">
                <Form.Control
                  className={shouldMarkError('capacity') ? "error" : ""}
                  onBlur={handleBlur('capacity')}
                  placeholder="Number of seats left"
                  value={capacity}
                  name='capacity'
                  onChange={handleChange}
                />
                <p className="errorMessage">{shouldMarkError('capacity') ? errors.capacity : ""}</p>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column lg="2">
                Departure Time
        </Form.Label>
              <Col lg="10">
                <DateTimePicker
                  variant="round"
                  value={departTimeFormat}
                  onChange={setDepartTimeFormat}
                />
              </Col>
            </Form.Group>
            <Button
              variant="success"
              onClick={async () => {
                if (!validateForm(errors)) {
                  console.error('Invalid Form')
                } else {
                  console.info('Valid Form')

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
                    setOrigin("");
                    setDestination("");
                    setCapacity("");
                    setDepartTimeFormat(new Date())
                    setShowSuccessMessage(true)
                  }
                }
              }
              }
            >
              Submit
          </Button>
          </Card.Body>
        </Card>
      </Container >
    </div>

  );
};

