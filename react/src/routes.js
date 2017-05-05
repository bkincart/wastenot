import React from 'react';
import { Route, IndexRoute } from 'react-router';
import InventoryShowContainer from './containers/InventoryShowContainer';
import InventoryIndexContainer from './containers/InventoryIndexContainer';
import PickupIndexContainer from './containers/PickupIndexContainer';
import NewInventoryForm from './containers/NewInventoryForm';

let routes = (
  <Route path='/'>
  <Route path='/inventories/new' component={NewInventoryForm} />
    <Route path='/inventories/:id' component={InventoryShowContainer} />
    <Route path='/users/:user_id/inventories' component={InventoryIndexContainer} />
    <Route path='/users/:user_id/pickups' component={PickupIndexContainer} />
  </Route>
);

export default routes;
