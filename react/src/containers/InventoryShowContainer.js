import React, { Component } from 'react';
import Label from '../components/Label';
import CommentTile from '../components/CommentTile';
import CommentInputField from '../components/CommentInputField';

class InventoryShowContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: null,
      measurement: '',
      item: '',
      available: null,
      active: null,
      user_id: null,
      store_name: '',
      store_address: '',
      store_city: '',
      store_state: '',
      store_zip: '',
      store_phone: '',
      comments: [],
      newComment: '',
      messages: [],
      current_user: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange (event) {
    let newComment = event.target.value;
    this.setState ({ newComment: newComment })
  };

  handleClearForm() {
    this.setState({
      newComment: '',
      messages: []
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    let requestBody = {
      body: this.state.newComment,
      inventory_id: this.props.params.id
    }
    fetch('/api/v1/comments', { method: 'POST', body: JSON.stringify(requestBody), credentials: 'same-origin' })
    .then(response => {
      let parsed = response.json()
      return parsed
    }).then(message => {
      this.setState({
        messages: message.messages,
      })
      if(message.comment) {
        this.setState({
          comments: [...this.state.comments, message.comment]
        })
      }
    })
    this.handleClearForm();
  }

  handleDelete(comment) {
    const deletedComment = comment;
    let requestBody = {
      id: comment.id,
      inventory_id: this.props.params.id
    }
    fetch(`/api/v1/comments/${comment.id}`, { method: 'DELETE', body: JSON.stringify(requestBody), credentials: 'same-origin' })
    .then(response => {
      let parsed = response.json();
      return parsed;
    }).then(message => {
      if(message.message == 'Success') {
        // Filter is not working for some reason??
        const newCommentAry = [];
        for (const existingComment of this.state.comments) {
          if(existingComment !== deletedComment) {
            newCommentAry.push(existingComment);
          }
        }
        this.setState({
          comments: newCommentAry
        });
      }
    });
  }

  componentDidMount() {
    let inventoryId = this.props.params.id;
    fetch(`/api/v1/inventories/${inventoryId}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    }).then(response => response.json()
    ).then(inventoryData => {
      this.setState({
        quantity: inventoryData.quantity,
        measurement: inventoryData.measurement,
        item: inventoryData.item,
        available: inventoryData.available,
        active: inventoryData.active,
        user_id: inventoryData.user_id,
        store_name: inventoryData.user.name,
        store_address: inventoryData.user.address,
        store_city: inventoryData.user.city,
        store_state: inventoryData.user.state,
        store_zip: inventoryData.user.zip,
        store_phone: inventoryData.user.phone,
        comments: inventoryData.comments
      })
    }).catch(error => console.error(`Error in fetch: ${error.message}`));
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

    let claimed = null
    if (!this.state.available) { claimed = <Label color='green' text='Claimed' /> }

    let expired = null
    if (!this.state.active) { expired = <Label color='orange' text='Expired' /> }

    let measurement_p = null
    if(this.state.measurement) {
      measurement_p = <p> Measurement: { this.state.measurement } </p>
    }

    let inventoryComments = this.state.comments.map(comment => {
      return(
        <CommentTile
          comment = {comment}
          current_user={this.state.current_user}
          handleDelete={this.handleDelete}
        />
      )
    })

    return (
      <div>
        <div className='row align-middle'>
          <div className='small-centered small-10 medium-5 columns text-center'>
              <h1> {this.state.store_name} </h1>
              <p>
                {this.state.store_address} <br/>
                {this.state.store_city}, {this.state.store_state} {this.state.store_zip}
                <br />
                ({this.state.store_phone.slice(0,3)}) {this.state.store_phone.slice(3,6)}-{this.state.store_phone.slice(6,10)}
              </p>
          </div>
          <div className='small-centered small-10 medium-5 columns text-center'>
            <p> Item: {this.state.item} </p>
            <p> Quantity: {this.state.quantity} </p>
            { measurement_p }
            { claimed }
            { expired }
          </div>
        </div>
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
      </div>
    );
  }
}

export default InventoryShowContainer;
