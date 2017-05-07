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
    this.handleClearForm = this.handleClearForm.bind(this);
  }

  handleChange (event) {
    let newComment = event.target.value;
    this.setState ({ comment: newComment })
  };

  handleClearForm(event) {
    event.preventDefault();
    this.setState({
      comment: '',
      messages: []
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    let requestBody = {
      body: this.state.comment,
      inventory_id: this.props.inventory_id
    }
    fetch('/api/v1/comments', { method: 'POST', body: JSON.stringify(requestBody), credentials: 'same-origin' })
    .then(response => {
      let parsed = response.json()
      return parsed
    }).then(message => {
      this.setState({
        messages: message.messages
      })
    })
    this.handleClearForm(event);
  }

  render () {
    debugger;
    return (
      <div className='row'>
        <div className='small-centered small-10 columns'>
          <form onSubmit={this.handleSubmit}>
            <CommentInputField
              placeholder='Add a comment here (hit Enter to submit)'
              value={this.state.comment}
              onChange={this.handleChange}
              errors={this.state.messages}
            />
          </form>
        </div>
      </div>
    )
  }
}

export default NewCommentFormContainer;
