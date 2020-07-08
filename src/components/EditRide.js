import React, { useState, Component } from "react";
import { Form, Input, Button } from "semantic-ui-react";

export class EditRide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      body: ""
    };
  }

  render() {
    return (
      <Form>
        <Form.Field>
          <Input
            placeholder="Add to the threads"
            value={this.state.body}
            onChange={e => this.setState({ body: e.target.value })}
          />
        </Form.Field>
        <Form.Field>
          <Button
            onClick={async () => {
              const ride = { body: this.props.body + this.state.body };
              this.state.body = "";

              const response = await fetch("/join-ride/" + this.props.rideid, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(ride)
              });

              if (response.ok) {
                console.log("response worked!");
                this.props.onChangeInfo(ride);
              }
            }}
          >
            Add!
          </Button>
        </Form.Field>
      </Form>
    );
  }
};
