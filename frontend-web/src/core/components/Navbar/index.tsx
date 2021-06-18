import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

import { getAccessTokenDecoded, logout } from 'core/utils/auth';
import { URL_MOVIES } from 'core/utils/ApiUrl';
import './styles.scss';

const Navbar = () => {

    const [currentUser, setCurrentUser] = useState<string>('');

    const location = useLocation();

    useEffect(() => {

        const currentUserData = getAccessTokenDecoded();

        setCurrentUser(currentUserData.user_name);

    }, [location]);

    const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        logout();
    }

    return (
        <nav className="row main-nav">
            <div className="row">
                <div className="col-md-9">
                    <Link to={URL_MOVIES} className="nav-logo-text">
                        <h4>MovieFlix</h4>
                    </Link>
                </div>

                <div className="col-md-2 nav-current-user">
                    {currentUser}
                </div>

                {currentUser && (

                    <div className="col-md-1 nav-link-sair">

                        <a
                            href="link"
                            className="nav-link-text active"
                            onClick={handleLogout}>
                            sair
                        </a>

                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;