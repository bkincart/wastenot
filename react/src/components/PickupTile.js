import React, { Component } from 'react';

class PickupTile extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    let measurement_p = null;
    if(this.props.inventory_measurement) {
      measurement_p = <p> <span className='strong'>Measurement:</span> { this.props.inventory_measurement } </p>
    };
    return (
      <div className='row pickup-tile-container'>
          <div className="small-10 small-centered columns pickup-tile">
            <a href={"/inventories/" + this.props.inventory_id} className='black-text'>
              <h2> {this.props.store_name} </h2>
              <p> <span className='strong'>Item:</span> { this.props.inventory_item } </p>
              <p> <span className='strong'>Quantity:</span> { this.props.inventory_quantity } </p>
              { measurement_p }
            </a>
          </div>
      </div>
    )
  }
};

export default PickupTile;
