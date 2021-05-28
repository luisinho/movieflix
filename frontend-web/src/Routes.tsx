import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './core/components/Navbar';
import Catalog from './pages/Catalog';

const Routes = () => (

    <BrowserRouter>
        <Navbar />
        <Switch>
            <Route path="/movies" exact>
                <Catalog />
            </Route>
        </Switch>
    </BrowserRouter>
);

export default Routes;