import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './core/components/Navbar';
import Home from 'pages/Home';
import Catalog from './pages/Catalog';
import { URL_ROOT, URL_HOME_LOGIN, URL_MOVIES } from 'core/utils/ApiUrl';

const Routes = () => (

    <BrowserRouter>
        <Navbar />
        <Switch>
            <Redirect from={URL_ROOT} to={URL_HOME_LOGIN} exact />
            <Route path={URL_HOME_LOGIN} exact>
                <Home />
            </Route>
            <Route path={URL_MOVIES} exact>
                <Catalog />
            </Route>
        </Switch>
    </BrowserRouter>
);

export default Routes;