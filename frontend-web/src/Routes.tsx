import { Router, Switch, Route, Redirect } from 'react-router-dom';

import Navbar from 'core/components/Navbar';
import history from 'core/utils/history';
import Home from 'pages/Home';
import Catalog from './pages/Catalog';
import { URL_ROOT, URL_HOME_LOGIN, URL_MOVIES, URL_MOVIE_DETAILS, URL_EMAIL, URL_USER_VISITOR, URL_USERS_PROCESS, URL_USERS } from 'core/utils/ApiUrl';
import PrivateRoute from 'core/assets/Routes/PrivateRoute';
import MovieDetails from 'pages/Catalog/components/MovieDetails';
import NewUser from 'pages/User';
import UserList from 'pages/User/UserList';
import Email from 'pages/Email';
import NewPassword from 'pages/NewPassword';

const Routes = () => (

    <Router history={history}>
        <Navbar />
        <Switch>
            <Redirect from={URL_ROOT} to={URL_HOME_LOGIN} exact />
            <Route path={URL_HOME_LOGIN} exact>
                <Home />
            </Route>
            <Route path={URL_EMAIL} exact={false}>
                <Email />
            </Route>
            <Route path={URL_USERS_PROCESS} exact={false}>
                <NewPassword />
            </Route>
            <Route path={URL_USER_VISITOR} exact={false}>
                <NewUser />
            </Route>
            <Route path={URL_USERS} exact={false}>
                <UserList />
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