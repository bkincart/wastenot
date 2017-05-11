import React, { Component } from 'react';
import InventoryTile from '../components/InventoryTile'

class PastInventoryIndexContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pastInventories: []
    }
  }

  componentDidMount () {
    fetch(`/api/v1/pastinventories`, {credentials: 'same-origin'})
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    }).then(response => response.json()
    ).then(pastInventoryData => {
      this.setState({
        pastInventories: pastInventoryData
      })
    }).catch(error => console.error(`Error in fetch: ${error.message}`));

  }

  render () {
    let pastInventories = this.state.pastInventories.map (inventory => {
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
            <h1>Your Past Inventory</h1>
          </div>
          <div className='small-10 medium-4 small-centered columns'>
            <a href={"/users/" + this.props.params.user_id + "/inventories"}>
              <button className='button past-inventory'> Back to Current Inventory </button>
            </a>
          </div>
        </div>
        { pastInventories }
      </div>
    )
  }
}

export default PastInventoryIndexContainer;
