import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Button, Divider, Form, Grid, Segment, Message } from 'semantic-ui-react'

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
        <Grid textAlign='center' 
          style={{ height: '100%',
                    border: 0,
                    backgroundColor: 'white'}}
          verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size='large'>
              <Segment stacked>
              <Form.Input
                icon='user'
                iconPosition='left'
                label='Userame'
                placeholder='Username'
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

              <Button
                content="Register"
                fluid
                size='large'
                color='teal'
                toggle onClick={this.setRedirect} />
              </Segment>
            </Form>

            <Message>
              Already have an account? <a href='/'>Back to Login</a>
            </Message>

          </Grid.Column>

        </Grid>

      </Segment>
  );
  }
}