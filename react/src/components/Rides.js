import React from "react";
import { Ride } from './Ride.js';
import { Grid } from "semantic-ui-react";

export const Rides = ({ rides }) => {
  return (
    <Grid divided='vertically'>
      {rides.map(ride => {
        return (
          <Ride ride={ride} key={ride.rideid} />
        );

      })}
    </Grid>
  );
};
