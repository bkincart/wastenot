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
    })
    .then(response => response.json())
    .then(inventoryData => {
      this.setState({
        inventories: inventoryData.inventories
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));

  }

  render () {
    let inventories = this.state.inventories.map (inventory => {
      return (
        <InventoryTile
          key = {inventory.id}
          id = {inventory.id}
          available = {inventory.available}
          quantity = {inventory.quantity}
          measurement = {inventory.measurement}
          item = {inventory.item}
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
          <div className='small-10 medium-7 small-centered columns'>
            <a href="/inventories/new">
              <button className='button add-inventory'> Add Inventory </button>
            </a>
          </div>
        </div>
        { inventories }
      </div>
    )
  }
}

export default InventoryIndexContainer;
