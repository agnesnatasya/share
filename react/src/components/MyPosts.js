import React from "react";
import { Post } from './Post';
import { List } from "semantic-ui-react";

export const MyPosts = ({ userId, myPosts }) => {
  return (
    <List>
      {myPosts
        .map((post) => {
          return (
            <Post post={post} key={post.postid} />
          );
        })}
    </List>
  );
};
