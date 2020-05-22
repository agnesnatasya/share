import React from "react";
import { Post } from'./Post.js';
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
