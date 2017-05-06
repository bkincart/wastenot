import React from 'react';
import { Route, IndexRoute } from 'react-router';
import InventoryShowContainer from './containers/InventoryShowContainer';
import InventoryIndexContainer from './containers/InventoryIndexContainer';
import PastInventoryIndexContainer from './containers/PastInventoryIndexContainer';
import PickupIndexContainer from './containers/PickupIndexContainer';
import NewInventoryFormContainer from './containers/NewInventoryFormContainer';

let routes = (
  <Route path='/'>
    <Route path='/inventories/new' component={NewInventoryFormContainer} />
    <Route path='/inventories/:id' component={InventoryShowContainer} />
    <Route path='/users/:user_id/inventories' component={InventoryIndexContainer} />
    <Route path='/users/:user_id/past' component={PastInventoryIndexContainer} />
    <Route path='/users/:user_id/pickups' component={PickupIndexContainer} />
  </Route>
);

export default routes;
