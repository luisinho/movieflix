import { ReactComponent as HomeAuthImage } from 'core/assets/images/Home-Auth.svg';

import Login from './components/Login';
import './styles.scss';

const Home = () => (
    <div className="row home-container">
        <div className="col-md-7">
            <h1 className="home-title">
                Avalie Filmes
            </h1>
            <p className="home-sub-title">
                Diga o que você achou do seu filme favorito
            </p>
            <HomeAuthImage className="home-image" />
        </div>
        <div className="col-md-4 home-content">
            <Login />
        </div>
    </div>
);

export default Home;