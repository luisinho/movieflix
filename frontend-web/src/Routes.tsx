import { Router, Switch, Route, Redirect } from 'react-router-dom';

import Navbar from 'core/components/Navbar';
import history from 'core/utils/history';
import Home from 'pages/Home';
import Catalog from './pages/Catalog';
import { URL_ROOT, URL_HOME_LOGIN, URL_MOVIES, URL_MOVIE_DETAILS, URL_USER_VISITOR } from 'core/utils/ApiUrl';
import PrivateRoute from 'core/assets/Routes/PrivateRoute';
import MovieDetails from 'pages/Catalog/components/MovieDetails';
import User from 'pages/User';

const Routes = () => (

    <Router history={history}>
        <Navbar />
        <Switch>
            <Redirect from={URL_ROOT} to={URL_HOME_LOGIN} exact />
            <Route path={URL_HOME_LOGIN} exact>
                <Home />
            </Route>
            <Route path={URL_USER_VISITOR} exact={false}>
                <User />
            </Route>
            <PrivateRoute path={URL_MOVIES} exact={true}>
                <Catalog />
            </PrivateRoute>
            <PrivateRoute path={URL_MOVIE_DETAILS} exact={false}>
                <MovieDetails />
            </PrivateRoute>
        </Switch>
    </Router>
);

export default Routes;