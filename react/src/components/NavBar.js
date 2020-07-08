import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Menu } from "semantic-ui-react";

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'Current Posts' };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    return (
      <Menu pointing secondary vertical fluid>
        <Menu.Item
          name='Current Posts'
          active={this.state.activeItem === 'Current Posts'}
          onClick={async () => {
              this.setState({ activeItem: 'Current Posts' });
              const response = await fetch('/posts');
              if (response.ok) {
                console.log("response worked");
                const posts = (await response.json());
                this.props.onChangePosts(posts.posts);
              }
            }
          }
          as={Link}
          to="/posts"
        />
        <Menu.Item
          name='My Posts'
          active={this.state.activeItem === 'My Posts'}
          onClick={async () => {
              this.setState({ activeItem: 'My Posts' });
              const response = await fetch("/my-posts/" + this.props.userId);

              if (response.ok) {
                console.log("response worked");
                const myposts = (await response.json());
                this.props.onChangeMyPosts(myposts.myposts);
              }
            }
          }
          as={Link}
          to={`/my-posts/${this.props.userId}`}
        />
        <Menu.Item
          name='New Post'
          active={this.state.activeItem === 'New Post'}
          onClick={this.handleItemClick}
          as={Link}
          to={`/new-post/${this.props.userId}`}
        />
      </Menu>
    );
  }
}
