import React, { Component } from 'react';
import PickupTile from '../components/PickupTile';

class PastPickupIndexContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pastPickups: []
    };
  }

  componentDidMount () {
    fetch(`/api/v1/pastpickups`, {credentials: 'same-origin'})
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    }).then(response => response.json()
  ).then(pastPickupData => {
      this.setState({
        pastPickups: pastPickupData
      });
    }).catch(error => console.error(`Error in fetch: ${error.message}`));

  }

  render () {
    let pastPickups = this.state.pastPickups.map (pickup => {
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
            <h1>Your Past Pickups</h1>
          </div>
          <div className='small-10 medium-4 small-centered columns'>
            <a href={"/users/" + this.props.params.user_id + "/pickups"}>
              <button className='button past-inventory'> Back to Current Pickups </button>
            </a>
          </div>
        </div>
        { pastPickups }
      </div>
    )
  }
}

export default PastPickupIndexContainer;
