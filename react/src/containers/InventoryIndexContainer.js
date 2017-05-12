import React, { Component } from 'react';
import InventoryTile from '../components/InventoryTile'

class InventoryIndexContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inventories: []
    }
  }

  componentDidMount () {
    fetch(`/api/v1/inventories`, {credentials: 'same-origin'})
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
        inventories: inventoryData
      })
    }).catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render () {
    let inventories = this.state.inventories.map (inventory => {
      return (
        <InventoryTile
          key = {inventory.id}
          id = {inventory.id}
          available = {inventory.available}
          active = {inventory.active}
          quantity = {inventory.quantity}
          measurement = {inventory.measurement}
          item = {inventory.item}
          store = {inventory.user.name}
        />
      )
    })

    return(
      <div>
      <br/>
        <div className='row align-middle'>
          <div className='small-10 medium-5 small-centered columns'>
            <h1>Your Current Inventory</h1>
          </div>
          <div className='small-10 medium-3 small-centered columns'>
            <a href="/inventories/new">
              <button className='button add-inventory'> Add New Inventory </button>
            </a>
          </div>
          <div className='small-10 medium-3 small-centered columns'>
            <a href={"/users/" + this.props.params.user_id + "/pastinventories"}>
              <button className='button past-inventory'> View Past Inventory </button>
            </a>
          </div>
        </div>
        { inventories }
      </div>
    )
  }
}

export default InventoryIndexContainer;
