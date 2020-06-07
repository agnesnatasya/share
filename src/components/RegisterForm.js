import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { Button, Image, Form, Grid, Segment, Header, Message } from 'semantic-ui-react'

export class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {  username:"",
                    password:"",
                    redirect: false
                  };
    this.setRedirect = this.setRedirect.bind(this);
  }

  renderRedirect = () => {
    if (this.state.redirect) {

      return <Redirect to="/posts" />;
    }
  }

  async setRedirect() {
      const user = { username: this.state.username,
                    password: this.state.password,
                   };
      const response = await fetch("/login", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify(user)
                      });

      if (response.ok) {
        this.setState({redirect:true});
      }

      const userid = await response.text();

      const response2 = await fetch("/posts");
      if (response2.ok) {
        console.log("response worked");
        const posts = (await response2.json());
        console.log(posts);
        this.props.onChangePosts(posts.posts);
      }
      //const userid = {await response.text()};
      this.handleChangeUserId(userid);
  }

  handleChangeUserId(userId) {
    this.props.onChange(userId);
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
            <Header as='h2' color='teal' textAlign='center'>
            Log-in to your account
            </Header>
            <Form size='large'>
              <Segment stacked>
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                label='Username'
                placeholder='Username'
                onChange={e => this.setState({username:e.target.value})}
              />
              <Form.Input
                icon='lock'
                fluid
                iconPosition='left'
                label='Password'
                type='password'
                onChange={e => this.setState({password:e.target.value})}
              />

              <Button
                fluid
                size='large'
                content='Login'
                color='teal'
                onClick={this.setRedirect}/>
            </Segment>
            </Form>

            <Message>
              New to us? <a href='/sign-up'>Sign Up</a>
            </Message>

          </Grid.Column>
        </Grid>

      </Segment>
    );
  }
}