import { ReactComponent as ArrowIcon } from 'core/assets/images/arrow.svg';

import './styles.scss';

const ButtonIcon = () => (
    <div className="d-flex">
        <button className="btn btn-primary btn-icon">
            <h5 className="btn-title">Logar</h5>
        </button>
        <div className="btn-icon-content">
            <ArrowIcon />
        </div>
    </div>
);

export default ButtonIcon;