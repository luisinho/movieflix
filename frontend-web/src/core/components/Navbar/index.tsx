import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { getAccessTokenDecoded, logout } from 'core/utils/auth';
import './styles.scss';

const Navbar = () => {

    const [currentUser, setCurrentUser] = useState('');

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
                <div className="col-md-10">
                    <a href="link" className="nav-logo-text">
                        <h4>MovieFlix</h4>
                    </a>
                </div>

                <div className="col-md-1">
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