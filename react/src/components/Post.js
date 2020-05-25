import React, { Component, useState } from "react";
import { List, Header, Grid } from "semantic-ui-react";
import { EditPost } from "./EditPost";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";

export class Post extends Component {
  constructor(props) {
    super(props);
        this.state = {
            showEditForm: false,
            postid: this.props.post.postid,
            title: this.props.post.title,
            body: this.props.post.body,
            comment: this.props.post.comment,
            editButton: 'Edit',
            commentButton: 'Comment',
            showCommentButton: 'Show Comment'
        };
        this.onChangeInfo = this.onChangeInfo.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onClickComment = this.onClickComment.bind(this);
  }

  onClickEdit () {
    if (this.state.showEditForm === false) {
      this.setState({ showEditForm: true });
      this.setState({ editButton: 'Cancel'} )
    } else {
      this.setState({ showEditForm: false });
      this.setState({ editButton: 'Edit'} )
    }
  }

  onClickComment () {
    if (this.state.showCommentForm === false) {
      this.setState({ showCommentForm: true });
      this.setState({ commentButton: 'Cancel'} )
    } else {
      this.setState({ showCommentForm: false });
      this.setState({ commentButton: 'Comment'} )
    }
  }

  onClickShowComment () {
    if (this.state.showCommentForm === false) {
      this.setState({ showComments: true });
      this.setState({ showCommentButton: 'Cancel'} )
    } else {
      this.setState({ showCommentForm: false });
      this.setState({ showCommentButton: 'Edit'} )
    }
  }

  onChangeInfo(newInfo) {
    this.setState({ body:  newInfo.body })
  }

  onComment(newInfo) {
    this.setState({ body:  newInfo.body })
  }

  showEditForm () {
   return (
     <EditPost onChangeInfo={this.onChangeInfo} postid={this.state.postid} body={this.state.body} />
    )
  };   
  
  showCommentForm () {
    return (
      <CommentPost onComment={this.onComment} postid={this.state.postid} body={this.state.body} />
     )
   }; 

  render() {
    return (
    <Grid.Row columns={2}>
      <Grid.Column width={13}>
        <List.Item key={this.props.post.postid}>
          <Header as="h1">{this.state.title}</Header>
          <List.Item>{this.state.body}</List.Item>
          <List.Item>{this.state.showEditForm && this.showEditForm()}</List.Item>
        </List.Item>
      </Grid.Column>
      <Grid.Column width={1} floated='right'>
        <button className="ui right floated button" onClick={this.onClickEdit}>
        {this.state.editButton}
        </button>
        <button className="ui right floated button" onClick={this.onClickComment}>
        {this.state.commentButton}
        </button>
        <button className="ui right floated button" onClick={this.onClickShowComment}>
        {this.state.showCommentButton}
        </button>
      </Grid.Column>
    </Grid.Row>                                         
    );
  }
}
