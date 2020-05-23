import React from "react";
import { MyPost } from './MyPost';
import { List } from "semantic-ui-react";

export const MyPosts = ({ userId, myPosts }) => {
  return (
    <List>
      {myPosts
        .map((order) => {
          return (
            <MyPost order={order} key={order.id} />
          );
        })}
    </List>
  );
};
