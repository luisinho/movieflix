import Routes from './Routes';
import Helmet from 'react-helmet';
import './core/assets/styles/custom.scss';
import './app.scss';

const App = () => {
    return (
        <div>
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
            </Helmet>
            <Routes />
        </div>
    );
}

export default App;