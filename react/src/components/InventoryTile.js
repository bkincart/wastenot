import React, { Component } from 'react';

class InventoryTile extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    let measurementP = null
    if(this.props.measurement) {
      measurementP = <p> Measurement: { this.props.measurement } </p>
    }

    let statusBar = <div className='available-status'> Available </div>
    if(!this.props.available && this.props.active) {
      statusBar = <div className='claimed-status'> Claimed </div>
    } else if(!this.props.active) {
      statusBar = <div className='expired-status'> Expired </div>
    }

    return (
      <div className='row inventory-tile-container align-center'>
          <div className={"small-10 small-centered columns inventory-tile"}>
            <a href={"/inventories/" + this.props.id} className='black-text'>
              {statusBar}
              <div className='tile-text'>
                <h2> { this.props.item } </h2>
                <h3> Quantity: { this.props.quantity } </h3>
                { measurementP }
                <p> { this.props.store} </p>
              </div>
              </a>
          </div>
      </div>
    )
  }
};

export default InventoryTile;
