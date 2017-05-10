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
      pickup: null,
      newComment: '',
      messages: [],
      current_user: null,
      current_user_type: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClaimClick = this.handleClaimClick.bind(this);
    this.handleUnclaimClick = this.handleUnclaimClick.bind(this);
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
        // .filter is not working for some reason??
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

  handleClaimClick() {
    // Creates a pickup for this inventory and updates the inventory item and state
    let requestBody = {
      shelter_id: this.state.current_user.id,
      store_id: this.state.user_id,
      inventory_id: this.props.params.id
    }
    fetch('/api/v1/pickups', { method: 'POST', body: JSON.stringify(requestBody), credentials: 'same-origin' })
    .then(response => {
      let parsed = response.json();
      return parsed;
    }).then(message => {
      console.log(message.messages)
      if(message.messages='Success') {
        this.setState({
          pickup: message.pickup,
          available: false
        })
      }
    });
  }


  handleUnclaimClick() {
    // Hands over pickup id and deletes pickup, resets inventory columns
    let pickupId = this.state.pickup.id
    let requestBody = {
      pickup_id: pickupId
    }
    fetch(`/api/v1/pickups/${pickupId}`, { method: 'DELETE', body: JSON.stringify(requestBody), credentials: 'same-origin' })
    .then(response => {
      let parsed = response.json();
      return parsed;
    }).then(message => {
      if(message.message == 'Success') {
        this.setState({
          pickup: null,
          available: true
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
        comments: inventoryData.comments,
        pickup: inventoryData.pickup
      })
    }).catch(error => console.error(`Error in fetch: ${error.message}`));
    fetch(`/api/v1/currentuser`, {credentials: 'same-origin'})
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
        current_user: userData.current_user,
        current_user_type: userData.current_user_type
      })
    }).catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let claimButton = null
    // Make claim button appear if inventory is available and active and user is a shelter
    if (this.state.available && this.state.active && this.state.current_user_type=='Shelter') { claimButton = <button className='button' onClick={this.handleClaimClick}>Claim this Inventory</button> }
    // Make unclaim button appear if inventory is active but not available and it was claimed by the current user
    if (!this.state.available && this.state.active && this.state.current_user.id==this.state.pickup.shelter_id) { claimButton = <button className='button' onClick={this.handleUnclaimClick}>Unclaim this Inventory</button> }

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
          key = {comment.id}
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
            { claimButton }
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
