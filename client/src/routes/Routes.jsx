/* eslint-disable import/no-anonymous-default-export */
import { Switch, Route } from 'react-router-dom';
import { PrivateRoutes } from '../routes';
import { Home, Login, Register } from '../pages';

export default function () {
  return (
    <Switch>
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <PrivateRoutes exact path='/' component={Home} />
    </Switch>
  );
}
