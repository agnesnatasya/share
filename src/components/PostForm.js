import React, { useState } from "react";
import { Form, Input, Header, Button } from "semantic-ui-react";

export const PostForm = ({userId}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <div>
      <Header as="h1">Create a new Post!</Header>
      <Form>
        <Form.Field>
          <label>Title</label>
          <Input
            placeholder="The title of your post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Body</label>
          <Input
            placeholder="The content of your post"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Button
            onClick={async () => {
              const post = { title, body };
              const response = await fetch("/new-post/" + userId, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(post),
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

