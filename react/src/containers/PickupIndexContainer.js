import React, { Component } from 'react';
import PickupTile from '../components/PickupTile';

class PickupIndexContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pickups: []
    };
  }

  componentDidMount () {
    fetch(`/api/v1/pickups`, {credentials: 'same-origin'})
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
    .then(pickupData => {
      this.setState({
        pickups: pickupData
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render () {
    let pickups = this.state.pickups.map (pickup => {
      debugger;
      return (
        <PickupTile
          key = {pickup.id}
          id = {pickup.id}
          store_name = {pickup.store.name}
          inventory_id = {pickup.inventory.id}
          inventory_item = {pickup.inventory.item}
          inventory_measurement = {pickup.inventory.measurement}
          inventory_quantity = {pickup.inventory.quantity}
        />
      )
    })

    return(
      <div>
        <h1>Your Current Pickups</h1>
        { pickups }
      </div>
    )
  }
}

export default PickupIndexContainer;
