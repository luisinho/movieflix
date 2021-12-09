import { useEffect } from 'react';
import { ReactComponent as HomeAuthImage } from 'core/assets/images/home-auth.svg';

import { logout } from 'core/utils/auth';
import Login from './components/Login';

import './styles.scss';

const Home = () => {

    useEffect(() => {
        logout();
    }, []);

    return (
        <div className="home-container">

            <div id="divImgLogin" className="d-flex flex-row">
                <div className="flex-fill w-30">
                    <h1 className="home-title">
                        Avalie Filmes
                </h1>
                    <p className="home-sub-title">
                        Diga o que você achou do seu <br /> filme favorito
                </p>
                    <HomeAuthImage className="home-image" />
                </div>

                <div className="flex-fill w-30">
                    <Login />
                </div>
            </div>

        </div>
    );
}
export default Home;