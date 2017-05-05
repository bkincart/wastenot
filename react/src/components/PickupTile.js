import React, { Component } from 'react';

class PickupTile extends Component {
  constructor(props) {
    super(props);
  }

  render () {

    return (
      <div className='row'>
          <div className={"small-10 small-centered columns inventory-tile " + outline}>
            <h2> Testing </h2>
          </div>
      </div>
    )
  }
};

export default PickupTile;
