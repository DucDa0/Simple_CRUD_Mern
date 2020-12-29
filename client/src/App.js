import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Routes } from './routes';

import { Provider } from 'react-redux';
import store from './store';
import setAuth from './auth';
import { loadUser } from './redux/actions/authAction';
import { LOGOUT } from './redux';
import api from './api';
function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuth(localStorage.token);
    }
    store.dispatch(loadUser());
    window.addEventListener('storage', () => {
      if (
        !localStorage.token ||
        api.defaults.headers.common['x-access-token'] !== localStorage.token
      ) {
        store.dispatch({ type: LOGOUT });
      }
    });
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact component={Routes} />
        </Switch>
      </Router>
    </Provider>
  );
}
export default App;
