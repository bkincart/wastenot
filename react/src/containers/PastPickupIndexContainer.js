import React, { Component } from 'react';
import PickupTile from '../components/PickupTile'

class PastPickupIndexContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      past_pickups: []
    }
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
        past_pickups: pastPickupData
      })
    }).catch(error => console.error(`Error in fetch: ${error.message}`));

  }

  render () {
    let past_pickups = this.state.past_pickups.map (pickup => {
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
      debugger;
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
        { past_pickups }
      </div>
    )
  }
}

export default PastPickupIndexContainer;
