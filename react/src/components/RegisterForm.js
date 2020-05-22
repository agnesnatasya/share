import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'

export class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {  name:"",
                    password:"",
                    redirect: false
                  };
    this.setRedirect = this.setRedirect.bind(this);
  }

  renderRedirect = () => {
    if (this.state.redirect) {

      return <Redirect to="/orders" />;
    }
  }

  async setRedirect() {
      const user = { name: this.state.name,
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

      const response2 = await fetch("/orders");
      if (response2.ok) {
        console.log("response worked");
        const orders = (await response2.json());
        console.log(orders);
        this.props.onChangeOrders(orders.orders);
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
        <Grid columns={2} relaxed='very' stackable>
          <Grid.Column>
            <Form>
              <Form.Input
                icon='user'
                iconPosition='left'
                label='Name'
                placeholder='name'
                onChange={e => this.setState({name:e.target.value})}
              />
              <Form.Input
                icon='lock'
                iconPosition='left'
                label='Password'
                type='password'
                onChange={e => this.setState({password:e.target.value})}
              />

              <Button
                content='Login'
                primary
                onClick={this.setRedirect}/>
            </Form>
          </Grid.Column>

          <Grid.Column verticalAlign='middle'>
            <Button content='Sign up' icon='signup' size='big' as={ Link } to='/sign-up' />
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
    );
  }
}