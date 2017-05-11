import React, { Component } from 'react';
import InventoryTile from '../components/InventoryTile'

class AvailableInventoryIndexContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      availableInventories: []
    }
  }

  componentDidMount () {
    fetch(`/api/v1/availableinventories`, {credentials: 'same-origin'})
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    }).then(response => response.json()
  ).then(availableInventoryData => {
      this.setState({
        availableInventories: availableInventoryData
      })
    }).catch(error => console.error(`Error in fetch: ${error.message}`));

  }

  render () {
    let availableInventories = this.state.availableInventories.map (inventory => {
      return (
        <InventoryTile
          key = {inventory.id}
          id = {inventory.id}
          available = {inventory.available}
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
            <h1> All Inventory Available Today </h1>
          </div>
          <div className='small-10 medium-4 small-centered columns'>
            <a href={"/users/" + this.props.params.user_id + "/pickups"}>
              <button className='button past-inventory'> Back to Your Current Pickups </button>
            </a>
          </div>
        </div>
        { availableInventories }
      </div>
    )
  }
}

export default AvailableInventoryIndexContainer;
