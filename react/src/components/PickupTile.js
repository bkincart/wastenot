import React, { Component } from 'react';

class PickupTile extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    let measurementP = null
    if(this.props.inventoryMeasurement) {
      measurementP = <p> <span className='strong'>Measurement:</span> { this.props.inventoryMeasurement } </p>
    }
    return (
      <div className='row pickup-tile-container'>
          <div className="small-10 small-centered columns pickup-tile">
            <a href={"/inventories/" + this.props.inventoryId} className='black-text'>
              <div className='tile-text'>
                <h2> {this.props.storeName} </h2>
                <p> <span className='strong'>Item:</span> { this.props.inventoryItem } </p>
                <p> <span className='strong'>Quantity:</span> { this.props.inventoryQuantity } </p>
                { measurementP }
              </div>
            </a>
          </div>
      </div>
    )
  }
};

export default PickupTile;
