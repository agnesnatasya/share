import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Menu } from "semantic-ui-react";

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: "home" };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    return (
      <Menu pointing secondary>
        <Menu.Item
          name="Current Posts"
          onClick={async () => {
              const response = await fetch('/posts');
              console.log("HELP");
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
          name="My Posts"
          onClick={async () => {
              const response = await fetch("/my-posts/" + this.props.userId);

              if (response.ok) {
                console.log("response worked");
                const posts = (await response.json());
                this.props.onChangeMyPosts(posts.posts);
              }
            }
          }
          as={Link}
          to={`/my-posts/${this.props.userId}`}
        />
        <Menu.Item
          name="New Post"
          onClick={this.handleItemClick}
          as={Link}
          to={`/new-post/${this.props.userId}`}
        />
      </Menu>
    );
  }
}
