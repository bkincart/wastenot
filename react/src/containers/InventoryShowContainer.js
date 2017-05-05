import React, { Component } from 'react';
import Label from '../components/Label';
import CommentTile from '../components/CommentTile';

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
      comments: []
    }
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
    })
    .then(response => response.json())
    .then(inventoryData => {
      this.setState({
        quantity: inventoryData.inventory.quantity,
        measurement: inventoryData.inventory.measurement,
        item: inventoryData.inventory.item,
        available: inventoryData.inventory.available,
        active: inventoryData.inventory.active,
        user_id: inventoryData.inventory.user_id,
        store_name: inventoryData.store.name,
        store_address: inventoryData.store.address,
        store_city: inventoryData.store.city,
        store_state: inventoryData.store.state,
        store_zip: inventoryData.store.zip,
        store_phone: inventoryData.store.phone,
        comments: inventoryData.comments
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let claimed = null
    if (!this.state.available) { claimed = <Label color='green' text='Claimed' /> }

    let expired = null
    if (!this.state.active) { expired = <Label color='orange' text='Expired' /> }

    let inventoryComments = this.state.comments.map(comment => {
      return(
        <CommentTile
          key = {comment.id}
          id = {comment.id}
          body = {comment.body}
          user_name = {comment.user_name}
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
            { claimed }
            { expired }
          </div>
        </div>
        <div className='row'>
          <div className='small-centered small-10 medium-8 columns comments'>
            <h1> Comments </h1>
          </div>
        </div>
        { inventoryComments }
        <p> Add a comment button </p>
      </div>
    );
  }
}

export default InventoryShowContainer;
