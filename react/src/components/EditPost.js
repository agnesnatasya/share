import React, { useState, Component } from "react";
import { Form, Input, Rating, Button } from "semantic-ui-react";

export class EditPost extends Component {
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
            onChange={e => this.setState({body: e.target.value})}
          />
        </Form.Field>
        <Form.Field>
          <Button
            onClick={async () => {
              const post = { body: this.props.body + this.state.body };
              this.state.body = "";

              const response = await fetch("/join-post/" + this.props.postid, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(post)
              });

              if (response.ok) {
                console.log("response worked!");
                this.props.onChangeInfo(post);
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
