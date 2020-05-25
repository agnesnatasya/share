import React from "react";
import { Post } from'./Post.js';
import { Grid } from "semantic-ui-react";

export const Posts = ({ posts }) => {
  return (
    <Grid divided='vertically'>
      {posts.map(post => {
        return (
          <Post post={post} key={post.postid} />
        );

      })}
    </Grid>
  );
};
