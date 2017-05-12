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
    }).then(response => response.json()
    ).then(pickupData => {
      this.setState({
        pickups: pickupData
      })
    }).catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render () {
    let pickups = this.state.pickups.map (pickup => {
      return (
        <PickupTile
          key = {pickup.id}
          id = {pickup.id}
          storeName = {pickup.store.name}
          inventoryId = {pickup.inventory.id}
          inventoryItem = {pickup.inventory.item}
          inventoryMeasurement = {pickup.inventory.measurement}
          inventoryQuantity = {pickup.inventory.quantity}
        />
      )
    })

    return(
      <div>
      <br/>
        <div className='row align-middle'>
          <div className='small-10 medium-5 small-centered columns'>
            <h1>Your Current Pickups</h1>
          </div>
          <div className='small-10 medium-3 small-centered columns'>
            <a href={"/users/" + this.props.params.user_id + "/pastpickups"}>
              <button className='button past-inventory'> View Past Pickups </button>
            </a>
          </div>
        </div>
        { pickups }
      </div>
    )
  }
}

export default PickupIndexContainer;
