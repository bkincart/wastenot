import React from 'react';
import { Route, IndexRoute } from 'react-router';
import InventoryShowContainer from './containers/InventoryShowContainer'
import HomeContainer from './containers/HomeContainer'

let routes = (
  <Route path='/'>
    <IndexRoute component={HomeContainer} />
    <Route path='/inventories/:id' component={InventoryShowContainer} />
  </Route>
);

export default routes;
