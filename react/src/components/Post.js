import React, { Component, useState } from "react";
import { List, Header, Rating } from "semantic-ui-react";
import { EditPost } from "./EditPost";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";

export class Post extends Component {
  constructor(props) {
    super(props);
        this.state = {
            showForm: false,
            postid: this.props.post.postid,
            title: this.props.post.title,
            body: this.props.post.body
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
     <EditPost onChangeInfo={this.onChangeInfo} orderid={this.state.orderid} />
    )
  };    

  render() {
    return (
    <List.Item key={this.props.order.id}>
      <Header as="h1">{this.state.title}</Header>
      <List.Item>{this.state.body}</List.Item>
      <button className="ui right floated button" onClick={this.onClick}>
      Edit
      </button>
      {this.state.showForm && this.showForm()}
    </List.Item>                                             
    );
  }
}
