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
        <nav className="main-nav d-flex flex-column">

            <div className="d-flex flex-row p-3">

                <div className="flex-fill">
                    <Link to={URL_MOVIES} className="nav-logo-text">
                        <h4>MovieFlix</h4>
                    </Link>
                </div>

                <div className="d-flex flex-row flex-fill">

                    <div className="nav-current-user flex-fill">
                        {currentUser}
                    </div>

                    {currentUser && (

                        <div className="nav-link-sair flex-fill">

                            <a
                                href="link"
                                className="nav-link-text active"
                                onClick={handleLogout}>
                                sair
                            </a>

                        </div>
                    )}
                </div>

            </div>
        </nav>
    );
}

export default Navbar;