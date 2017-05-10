import React from 'react';
import { Route, IndexRoute } from 'react-router';
import InventoryShowContainer from './containers/InventoryShowContainer';
import InventoryIndexContainer from './containers/InventoryIndexContainer';
import PastInventoryIndexContainer from './containers/PastInventoryIndexContainer';
import PickupIndexContainer from './containers/PickupIndexContainer';
import PastPickupIndexContainer from './containers/PastPickupIndexContainer';
import NewInventoryFormContainer from './containers/NewInventoryFormContainer';
import EditCommentContainer from './containers/EditCommentContainer';

let routes = (
  <Route path='/'>
    <Route path='/inventories/new' component={NewInventoryFormContainer} />
    <Route path='/inventories/:id' component={InventoryShowContainer} />
    <Route path='/users/:user_id/inventories' component={InventoryIndexContainer} />
    <Route path='/users/:user_id/pastinventories' component={PastInventoryIndexContainer} />
    <Route path='/users/:user_id/pickups' component={PickupIndexContainer} />
    <Route path='/users/:user_id/pastpickups' component={PastPickupIndexContainer} />
    <Route path='/comments/:id/edit' component={EditCommentContainer} />
  </Route>
);

export default routes;
