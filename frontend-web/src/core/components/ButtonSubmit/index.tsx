import './styles.scss';

type Props = {
    label: string;
}

const ButtonSubmit = ({ label }: Props) => {
    return (
        <div className="d-flex">
            <button className="btn btn-primary">
                <div className="btn-register-title">
                    {label}
                </div>
            </button>
        </div>
    );
}

export default ButtonSubmit;