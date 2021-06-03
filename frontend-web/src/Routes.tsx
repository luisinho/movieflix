import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './core/components/Navbar';
import Home from 'pages/Home';
import Catalog from './pages/Catalog';

const Routes = () => (

    <BrowserRouter>
        <Navbar />
        <Switch>
            <Redirect from="/" to="/auth/login" exact />
            <Route path="/">
                <Home />
            </Route>
            <Route path="/movies" exact>
                <Catalog />
            </Route>
        </Switch>
    </BrowserRouter>
);

export default Routes;