import React, { Component } from 'react';
import CommentInputField from '../components/CommentInputField';

class NewCommentFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
      messages: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    newComment = event.target.value;
    this.setState ({ comment: newComment })
  };

  handleSubmit (event) {
    event.preventDefault;
    debugger;
  }

  render () {
    return (
      <div className='row new-comment'>
        <form onSubmit={this.handleSubmit}>
          <CommentInputField
            placeholder='Add a comment here'
            value={this.state.comment}
            onChange={this.handleChange}
            errors={this.state.messages}
          />
          <input type='submit' />
        </form>
      </div>
    )
  }
}

export default NewCommentFormContainer;
