import React, { Component } from 'react';
import InventoryTile from '../components/InventoryTile'

class NearMeInventoryIndexContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nearMeInventories: []
    }
  }

  componentDidMount () {
    fetch(`/api/v1/nearmeinventories`, {credentials: 'same-origin'})
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    }).then(response => response.json()
    ).then(nearMeInventoryData => {
      this.setState({
        nearMeInventories: nearMeInventoryData
      })
    }).catch(error => console.error(`Error in fetch: ${error.message}`));

  }

  render () {
    let nearMeInventories = this.state.nearMeInventories.map (inventory => {
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
            <h1>Inventory Available Near You</h1>
          </div>
          <div className='small-10 medium-4 small-centered columns'>
            <a href={"/users/" + this.props.params.user_id + "/pickups"}>
              <button className='button past-inventory'> Back to Your Current Pickups </button>
            </a>
          </div>
        </div>
        { nearMeInventories }
      </div>
    )
  }
}

export default NearMeInventoryIndexContainer;
