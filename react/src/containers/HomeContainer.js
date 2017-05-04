import React, { Component } from 'react';
import { Link } from 'react-router';

class HomeContainer extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount () {
  }

  render() {
    return (
      <div>
        <div className='landing-photo' />
        <Link to={`/inventories/2`}>This is a placeholder link to an inventory page</Link>
        <Link to={`/users/1/current`}>This is a placeholder link to store homepage</Link>
        <Link to={`/users/3/current`}>This is a placeholder link to an inventory page</Link>
      </div>
    );
  }
}

export default HomeContainer;
