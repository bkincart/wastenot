import React, { Component } from 'react';
import CommentTile from '../components/CommentTile';
import CommentInputField from '../components/CommentInputField';
import { browserHistory } from 'react-router';

class CommentsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newComment: '',
      messages: [],
      current_user: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(id) {
    let requestBody = {
      id: id,
      inventory_id: this.props.inventory_id
    }
    fetch(`/api/v1/comments/${id}`, { method: 'DELETE', body: JSON.stringify(requestBody), credentials: 'same-origin' })
    .then(response => {
      let parsed = response.json()
      return parsed
    }).then(message => {
      if(message.message == 'Success') {
        debugger;
        browserHistory.push(`/inventories/${this.props.inventory_id}`);
      }
    })
  }

  handleChange (event) {
    let newComment = event.target.value;
    this.setState ({ newComment: newComment })
  };

  handleClearForm(event) {
    event.preventDefault();
    this.setState({
      newComment: '',
      messages: []
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    let requestBody = {
      body: this.state.newComment,
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

  componentDidMount () {
    debugger;
    fetch(`/api/v1/comments`, {credentials: 'same-origin'})
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    }).then(response => response.json()
  ).then(userData => {
      this.setState({
        current_user: userData.current_user
      })
    }).catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let inventoryComments = this.props.comments.map(comment => {
      return(
        <CommentTile
          key = {comment.id}
          id = {comment.id}
          body = {comment.body}
          user_name = {comment.user_name}
          timestamp = {comment.updated_at}
          user_id = {comment.user_id}
          current_user={this.state.current_user}
          handleDelete={this.handleDelete}
        />
      )
    })

    return(
      <div className='comments-container'>
        <div className='row'>
          <div className='small-centered small-10 columns comments'>
            <h1> Comments </h1>
          </div>
        </div>
        <div className='row'>
          <div className='small-centered small-10 columns'>
            <form onSubmit={this.handleSubmit}>
              <CommentInputField
                label = 'Body'
                placeholder='Add a comment here (hit Enter to submit)'
                value={this.state.newComment}
                onChange={this.handleChange}
                errors={this.state.messages}
              />
            </form>
          </div>
        </div>
        { inventoryComments }
      </div>
    )
  }
}

export default CommentsContainer;
