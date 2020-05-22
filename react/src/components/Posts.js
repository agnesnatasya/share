import React from "react";
import { Order } from'./Order.js';
import { List } from "semantic-ui-react";

export const Posts = ({ posts }) => {
  return (
    <List>
      {posts.map(post => {
        return (
          <Post post={post} key={post.postid} />
        );

      })}
    </List>
  );
};
