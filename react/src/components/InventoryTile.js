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

    let claimed = null
    if(!this.props.available) {
      claimed = <h3 className='orange claimed'> Claimed </h3>
    }

    let outline = 'orange-outline'
    if(this.props.available) {
      outline = 'green-outline'
    }

    return (
      <div className='row inventory-tile-container align-center'>
          <div className={"small-10 small-centered columns inventory-tile " + outline}>
            <a href={"/inventories/" + this.props.id} className='black-text'>
              <h2> <span className='strong'>Item:</span> { this.props.item } </h2>
              <h3> Quantity: { this.props.quantity } </h3>
              <p> { this.props.store} </p>
              { measurementP }
              { claimed }
              </a>
          </div>
      </div>
    )
  }
};

export default InventoryTile;
