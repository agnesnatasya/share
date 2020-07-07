import React, { useState } from "react";
import { Form, Input, Header, Button } from "semantic-ui-react";

export const RideForm = ({ userId }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <div>
      <Header as="h1">Create a new Ride!</Header>
      <Form>
        <Form.Field>
          <label>Title</label>
          <Input
            placeholder="The title of your ride"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Body</label>
          <Input
            placeholder="The content of your ride"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Button
            onClick={async () => {
              const ride = { title, body };
              const response = await fetch("/new-ride/" + userId, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(ride),
              });

              if (response.ok) {
                console.log("response worked");
                setTitle("");
                setBody("");
              }
            }}
          >
            Submit
          </Button>
        </Form.Field>
      </Form>
    </div>
  );
};

