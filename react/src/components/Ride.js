import React, { Component, useState } from "react";
import { List, Header, Grid } from "semantic-ui-react";
import { EditRide } from "./EditRide";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";

export class Ride extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      rideid: this.props.ride.rideid,
      title: this.props.ride.title,
      body: this.props.ride.body,
      buttonName: 'Edit'
    };
    this.onChangeInfo = this.onChangeInfo.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    console.log("clicked :(")
    if (this.state.showForm === false) {
      this.setState({ showForm: true });
      this.setState({ buttonName: 'Cancel' })
    } else {
      this.setState({ showForm: false });
      this.setState({ buttonName: 'Edit' })
    }

  }

  onChangeInfo(newInfo) {
    this.setState({ body: newInfo.body })
  }

  showForm() {
    return (
      <EditRide onChangeInfo={this.onChangeInfo} rideid={this.state.rideid} body={this.state.body} />
    )
  };

  render() {
    return (
      <Grid.Row columns={2}>
        <Grid.Column width={13}>
          <List.Item key={this.props.ride.rideid}>
            <Header as="h1">{this.state.title}</Header>
            <List.Item>{this.state.body}</List.Item>
            <List.Item>{this.state.showForm && this.showForm()}</List.Item>
          </List.Item>
        </Grid.Column>
        <Grid.Column width={1} floated='right'>
          <button className="ui right floated button" onClick={this.onClick}>
            {this.state.buttonName}
          </button>
        </Grid.Column>
      </Grid.Row>
    );
  }
}
