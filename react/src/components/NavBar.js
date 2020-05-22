import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Menu } from "semantic-ui-react";

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: "home" };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    console.log(this.props.userId);
    return (
      <Menu pointing secondary>
        <Menu.Item
          name="Current Orders"
          onClick={async () => {
              const response = await fetch("/orders");

              if (response.ok) {
                console.log("response worked");
                const orders = (await response.json());
                this.props.onChangeOrders(orders.orders);
              }
          }
        }
          as={Link}
          to="/orders"
        />
        <Menu.Item
          name="My Orders"
          onClick={async () => {
              const response = await fetch("/my-orders/" + this.props.userId);

              if (response.ok) {
                console.log("response worked");
                const orders = (await response.json());
                console.log(orders);
                this.props.onChangeMyOrders(orders.orders);
              }
            }
          }
          as={Link}
          to={`/my-orders/${this.props.userId}`}
        />
        <Menu.Item
          name="New Order"
          onClick={this.handleItemClick}
          as={Link}
          to={`/new-order/${this.props.userId}`}
        />
      </Menu>
    );
  }
}
