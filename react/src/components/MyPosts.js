import React from "react";
import { Post } from './Post';
import { Grid } from "semantic-ui-react";

export const MyPosts = ({ userId, myPosts }) => {
  return (
    <Grid divided='vertically'>
      {myPosts.map(post => {
        return (
          <Post post={post} key={post.postid} />
        );

      })}
    </Grid>
  );
};
