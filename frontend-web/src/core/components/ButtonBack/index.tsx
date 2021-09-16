import { Link } from 'react-router-dom';
import './styles.scss';

const ButtonBack = () => {
    return (
        <div className="d-flex">
            <Link to="/">
                <button type="button" className="btn btn-primary">
                    <div className="btn-back-title">
                        Voltar
                </div>
                </button>
            </Link>
        </div>
    );
}

export default ButtonBack;