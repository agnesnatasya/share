import React, { useState, Component } from "react";
import { Form, Input, Rating, Button } from "semantic-ui-react";

export class EditPost extends Component {
  constructor(props) {
        super(props);

        this.state = {
            items: ""
        };
  }

  render() {
    return (
      <Form>
        <Form.Field>
          <Input
            placeholder="Add to the threads"
            value={this.state.items}
            onChange={e => this.setState({items: e.target.value})}
          />
        </Form.Field>
        <Form.Field>
          <Button
            onClick={async () => {
              const order = { orderid: this.props.orderid, items: this.state.items };

              const response = await fetch("/join-order/" + this.props.orderid, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(order)
              });

              if (response.ok) {
                console.log("response worked!");
                this.props.onChangeInfo(order);
                this.state.items = "";
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
