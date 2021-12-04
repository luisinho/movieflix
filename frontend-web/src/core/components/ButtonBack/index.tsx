import { Link } from 'react-router-dom';

import './styles.scss';

type Props = {
    actionUrl: string;
}

const ButtonBack = ({ actionUrl = '/' }: Props) => {
    return (
        <div className="d-flex">
            <Link to={actionUrl}>
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