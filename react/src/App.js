import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { SignUp } from './components/SignUp';
import { RegisterForm } from './components/RegisterForm';
import { PostForm } from './components/PostForm';
import { MyPosts } from './components/MyPosts';
import { NavBar } from './components/NavBar';
import { Posts } from './components/Posts'
import { Route, Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    props.match.params.userId == rest.userId
      ? <Component {...rest} />
      : <Redirect to='/login' />
  )} />
)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myPosts:[],
      posts: [],
      userId: 0,
    };
    this.changeUserId = this.changeUserId.bind(this);
    this.changePosts = this.changePosts.bind(this);
    this.changeMyPosts = this.changeMyPosts.bind(this);
  }

  changeUserId(newUserId) {
    this.setState({
      userId: newUserId
    });
  }

  changePosts(newPosts) {
    this.setState({
      posts: newPosts
    });
  }

  changeMyPosts(newPosts) {
    this.setState({
      myPosts: newPosts
    });
  }

  render() {
    console.log(this.state.userId)
    if (this.state.userId==0) {
      return(
        <Container style={{ marginTop: 40 }}>
          <Route exact path="/posts" render={() => <Posts posts={this.state.posts} />} />
          <Route exact path="/login" render={() => <RegisterForm onChange={this.changeUserId} onChangePosts={this.changePosts} onChangeMyPosts={this.changeMyPosts} />} />
          <Route exact path="/sign-up" component={SignUp} />
          <PrivateRoute exact path="/new-post/:userId" userId={this.state.userId} component={PostForm} />
          <PrivateRoute exact path="/my-posts/:userId" userId={this.state.userId} myPosts={this.state.myPosts} component={() => <MyPosts />} />
      </Container>
      )
    }
    return (
      <Container style={{ marginTop: 40 }}>
        <NavBar userId={this.state.userId} posts={this.state.posts} onChangePosts={this.changePosts} onChangeMyPosts={this.changeMyPosts} />
        <Route exact path="/posts" render={() => <Posts posts={this.state.posts} />} />
        <Route exact path="/login" render={() => <RegisterForm onChange={this.changeUserId} onChangePosts={this.changePosts} onChangeMyPosts={this.changeMyPosts} />} />
        <Route exact path="/sign-up" component={SignUp} />
        <PrivateRoute exact path="/new-post/:userId" userId={this.state.userId} component={PostForm} />
        <PrivateRoute exact path="/my-posts/:userId" userId={this.state.userId} component={() => <MyPosts myPosts={this.state.myPosts} />} />
      </Container>
    );
  }
}

export default App;


  

 
