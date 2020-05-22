import React, { Component, useState } from "react";
import { List, Header, Rating } from "semantic-ui-react";
import { EditOrder } from "./EditOrder";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";

export class MyPost extends Component {
  constructor(props) {
    super(props);
        this.state = {
        };
  }  

  render() {
    return (
    <List.Item key={this.props.order.id}>
    </List.Item>                                             
    );
  }
}
