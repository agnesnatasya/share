import React, { Component, useState } from "react";
import { List, Header, Rating } from "semantic-ui-react";
import { EditOrder } from "./EditOrder";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";

export class Post extends Component {
  constructor(props) {
    super(props);
        this.state = {
            showForm: false,
        };
        this.onChangeInfo = this.onChangeInfo.bind(this);
        this.onClick = this.onClick.bind(this);
  }

  onClick () {
    this.setState({ showForm: true });
  }

  onChangeInfo(newInfo) {
    this.setState({ items:  newInfo.items? newInfo.items  : this.state.items})
  }

  showForm () {
   return (
     <EditOrder onChangeInfo={this.onChangeInfo} orderid={this.state.orderid} />
    )
  };    

  render() {
    return (
    <List.Item key={this.props.order.id}>
      <button className="ui right floated button" onClick={this.onClick}>
      Edit
      </button>
      {this.state.showForm && this.showForm()}
    </List.Item>                                             
    );
  }
}
