import React, { Component } from 'react';
import { Link } from 'react-router';

class HomeContainer extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
    <Link to={`/inventories/2`}>This is a placeholder link to an inventory page</Link>
    );
  }
}

export default HomeContainer;
