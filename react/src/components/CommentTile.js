import React, { Component } from 'react';

class CommentTile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let editDeleteOptions = null
    if(this.props.current_user) {
      if(this.props.comment.user_id==this.props.current_user.id) {
        editDeleteOptions = <p>
          <a href={`/comments/` + this.props.comment.id + `/edit`}>Edit Comment</a>
           <a onClick={() => this.props.handleDelete(this.props.comment)}>Delete Comment</a>
        </p>
      }
    }

    return(
      <div className='row'>
        <div className='small-centered small-10 columns comment_tile'>
          <h2>{this.props.comment.body}</h2>
          <p>Posted by {this.props.comment.user_name} on {this.props.comment.viewtime}</p>
          {editDeleteOptions}
        </div>
      </div>
    )
  }
}

export default CommentTile;
