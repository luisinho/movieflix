import ButtonIcon from 'core/components/Buttonicon';
import { useForm } from 'react-hook-form';
import './styles.scss';

type FormData = {
    username: string;
    password: string;
}

const Login = () => {

    const { register, handleSubmit } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
    }

    return (
        <div className="login-main">

            <h1 className="login-title">
                Login
            </h1>

            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    className="form-control login-input margin-bottom-30"
                    placeholder="Email"
                />
                <input
                    type="password"
                    className="form-control login-input login-input-button"
                    placeholder="Senha"
                />

                <div className="login-btn-icon">
                    <ButtonIcon />
                </div>

            </form>
        </div>
    );
}

export default Login;