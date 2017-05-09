import React, { Component } from 'react';

class CommentTile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let editDeleteOptions = null
    if(this.props.user_id==this.props.current_user.id) {
      editDeleteOptions = <p>
        <a href={`/comments/` + this.props.id + `/edit`}>Edit Comment</a>
         <a onClick={() => this.props.handleDelete(this.props.id)}>Delete Comment</a>
      </p>
    }

    return(
      <div className='row'>
        <div className='small-centered small-10 columns comment_tile'>
          <h2>{this.props.body}</h2>
          <p>Posted by {this.props.user_name} at {this.props.timestamp}</p>
          {editDeleteOptions}
        </div>
      </div>
    )
  }
}

export default CommentTile;
