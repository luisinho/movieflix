import './styles.scss';

const Navbar = () => (
    <nav className="row main-nav">
        <div className="row">
            <div className="col-md-11">
                <a href="link" className="nav-logo-text">
                    <h4>MovieFlix</h4>
                </a>
            </div>
            <div className="col-md-1 nav-link-sair">
                <a href="link" className="nav-link-text active">
                    sair
                </a>
            </div>
        </div>
    </nav>
);

export default Navbar;