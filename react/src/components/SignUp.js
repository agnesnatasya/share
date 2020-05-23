import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'

export class SignUp extends Component {
  constructor(props) {
        super(props);

        this.state = {
          username: "",
          phone: 0,
          address: "",
          password: "",
          redirect: false
        };
        this.onChangeInfo = this.onChangeInfo.bind(this);
        this.setRedirect = this.setRedirect.bind(this);
  }

  onChangeInfo(newInfo) {
    this.setState({ username: newInfo.username,  phone: newInfo.phone, address: newInfo.address, password: newInfo.password })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
  };

  async setRedirect() {
    const user = {
      username: this.state.username,
      phone: this.state.phone,
      address: this.state.address,
      password: this.state.password,
    };
    const response = await fetch("/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      this.setState({ redirect: true });
    }
  }

  render() {
    return (
      <Segment placeholder>
        {this.renderRedirect()}
        <Grid>
          <Grid.Column>
            <Form>
              <Form.Input
                icon='user'
                iconPosition='left'
                label='Name'
                placeholder='Name'
                onChange={e => this.setState({username:e.target.value})}
              />
              <Form.Input
                type='integer'
                icon='user'
                iconPosition='left'
                label='Phone'
                placeholder='Phone'
                onChange={e => this.setState({phone:e.target.value})}
              />
              <Form.Input
                icon='user'
                iconPosition='left'
                label='Address'
                placeholder='Address'
                onChange={e => this.setState({address:e.target.value})}
              />
              <Form.Input
                icon='lock'
                iconPosition='left'
                label='Password'
                type='Password'
                onChange={e => this.setState({password:e.target.value})}

              />

              <Button content="Register" primary onClick={this.setRedirect} />
            </Form>
          </Grid.Column>

        </Grid>

      </Segment>
  );
  }
}