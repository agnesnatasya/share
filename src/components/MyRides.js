import React from "react";
import { Order } from './Ride';
import { Grid } from "semantic-ui-react";

export const MyOrders = ({ userId, myOrders }) => {
  return (
    <Grid divided='vertically'>
      {myOrders.map(order => {
        return (
          <Order order={order} key={order.orderid} />
        );

      })}
    </Grid>
  );
};
