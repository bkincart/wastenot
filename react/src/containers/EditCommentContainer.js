import React, { Component } from 'react';
import CommentInputField from '../components/CommentInputField'
import { browserHistory } from 'react-router';

class EditCommentContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updatedComment: '',
      messages: []
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let commentId = this.props.params.id;
    fetch(`/api/v1/comments/${commentId}`)
    .then(response => response.json())
    .then(responseData => {
      this.setState({ updatedComment: responseData.body})
    })
  }

  handleChange(event) {
    let newComment = event.target.value;
    this.setState ({ updatedComment: newComment })
  }

  handleSubmit(event) {
    event.preventDefault()
    let commentId = this.props.params.id;
    let requestBody = {
      body: this.state.updatedComment,
      id: commentId
    }
    fetch(`/api/v1/comments/${commentId}`, { method: 'PUT', body: JSON.stringify(requestBody), credentials: 'same-origin' })
    .then(response => {
      let parsed = response.json()
      return parsed
    }).then(message => {
      this.setState({
        messages: message.messages
      })
      if(message.messages == 'Success') {
        browserHistory.push(`/inventories/${message.inventory_id}`);
      }
    })
  }

  render() {
    return(
      <div className='comments-container'>
        <div className='row'>
          <div className='small-centered small-10 columns comments'>
            <h1> Edit your Comment </h1>
          </div>
        </div>
        <div className='row'>
          <div className='small-centered small-10 columns'>
            <form onSubmit={this.handleSubmit}>
              <CommentInputField
                label = 'Body'
                value={this.state.updatedComment}
                onChange={this.handleChange}
                errors={this.state.messages}
              />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default EditCommentContainer;
