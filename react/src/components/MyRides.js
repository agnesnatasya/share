import React from "react";
import { Ride } from './Ride';
import { Grid } from "semantic-ui-react";

export const MyRides = ({ userId, myRides }) => {
  return (
    <Grid divided='vertically'>
      {myRides.map(ride => {
        return (
          <Ride ride={ride} key={ride.rideid} />
        );

      })}
    </Grid>
  );
};
