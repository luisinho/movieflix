import { Router, Switch, Route, Redirect } from 'react-router-dom';

import Navbar from 'core/components/Navbar';
import history from 'core/utils/history';
import Home from 'pages/Home';
import Catalog from './pages/Catalog';
import { URL_ROOT, URL_HOME_LOGIN, URL_MOVIES } from 'core/utils/ApiUrl';
import PrivateRoute from 'core/assets/Routes/PrivateRoute';

const Routes = () => (

    <Router history={history}>
        <Navbar />
        <Switch>
            <Redirect from={URL_ROOT} to={URL_HOME_LOGIN} exact />
            <Route path={URL_HOME_LOGIN} exact>
                <Home />
            </Route>
            <PrivateRoute path={URL_MOVIES}>
                <Catalog />
            </PrivateRoute>
        </Switch>
    </Router>
);

export default Routes;