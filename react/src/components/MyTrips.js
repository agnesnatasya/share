import React from "react";
import { Trip } from './Trip';
import { Grid } from "semantic-ui-react";

export const MyTrips = ({ myTrips }) => {
  return (
    <Grid divided='vertically'>
      {myTrips.map(ride => {
        return (
          <Trip ride={ride} key={ride.id} />
        );

      })}
    </Grid>
  );
};
