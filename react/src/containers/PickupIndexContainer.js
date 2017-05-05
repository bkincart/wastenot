import React, { Component } from 'react';
import PickupTile from '../components/PickupTile'

class PickupIndexContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pickups: []
    }
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
        pickups: pickupData.pickups
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));

  }

  render () {
    let pickups = this.state.pickups.map (inventory => {
      return (
        <PickupTile
          key = {pickup.id}
          id = {pickup.id}
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
