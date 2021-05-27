import './styles.scss';

const Navbar = () => (
    <nav className="row bg-primary main-nav">
        <div className="col-10">
            <a href="link" className="nav-logo-text">
                <h4>MovieFlix</h4>
            </a>
        </div>
        <div className="col-2 nav-link-sair">
            <a href="link" className="nav-link-text active">
                sair
            </a>
        </div>
    </nav>
);

export default Navbar;