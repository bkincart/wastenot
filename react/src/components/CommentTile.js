import React from 'react';

const CommentTile = (props) => {
  return(
    <div className='row'>
      <div className='small-centered small-10 columns comment_tile'>
        <h2>{props.body}</h2>
        <p>Posted by {props.user_name} at {props.timestamp}</p>
      </div>
    </div>
  )
}

export default CommentTile;
