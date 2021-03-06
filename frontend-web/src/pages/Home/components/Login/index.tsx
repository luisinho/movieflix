import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, Link } from 'react-router-dom';
import { AxiosError } from 'axios';

import { makeLogin } from 'core/utils/request';
import { saveSessionData } from 'core/utils/auth';
import { URL_MOVIES, URL_EMAIL, URL_USERS } from 'core/utils/ApiUrl';
import ButtonIcon from 'core/components/Buttonicon';
import history from 'core/utils/history';
import { STATUS_200 } from 'core/utils/HttpStatus';

import './styles.scss';
import LoginLoader from './Loader/LoginLoader';

type FormData = {
    username: string;
    password: string;
}

type LocationState = {
    from: string;
}

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [hasError, setHasError] = useState(false);

    const [msgError, setMsgError] = useState('');

    const location = useLocation<LocationState>();

    const { from } = location.state || { from: { pathname: URL_MOVIES } };

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (formData: FormData) => {

        setIsLoading(true);

        makeLogin(formData).then(response => {

            if (response.status === STATUS_200) {

                setHasError(false);
                setMsgError('');
                saveSessionData(response.data);
                history.replace(from);
            }

        }).catch((err: AxiosError) => {
            setHasError(true);
            setMsgError(err.response?.data.error_description);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <div className="login-main">

            <h1 className="login-title">
                Login
            </h1>

            {isLoading ? <LoginLoader /> : ('')}

            {hasError && (

                <div className="alert alert-primary mt-5 login-font-alert">
                    {msgError}
                </div>
            )}

            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="margin-bottom-30">
                    <input
                        type="email"
                        className={`form-control input-forms ${errors.username ? 'is-invalid' : ''}`}
                        placeholder="Email"
                        {...register("username",
                            {
                                required: "Campo email obrigat??rio",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Email inv??lido"
                                }
                            })}
                    />
                    {errors.username && (
                        <div className="invalid-feedback d-block">
                            {errors.username.message}
                        </div>
                    )}
                </div>

                <div>
                    <input
                        type="password"
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        className={`form-control input-forms ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="Senha"
                        {...register("password", {
                            required: "Campo senha obrigat??rio.",
                            pattern: {
                                value: /^[0-9]{4,8}$/i,
                                message: "A senha deve conter somente n??mero de 4 a 8 digitos!"
                            }
                        })}
                    />
                    {errors.password && (
                        <div className="invalid-feedback d-block">
                            {errors.password.message}
                        </div>
                    )}
                </div>

                <div className="p-1">
                    <Link className="login-forgot-password" to={`${URL_EMAIL}`}>
                        Esqueci a senha ?
                    </Link>
                </div>

                <div className="login-btn-icon">
                    <ButtonIcon />
                    <div className="login-nao-tem-cadastro p-1">
                        N??o tem Cadastro Visitante ?
                        <Link className="login-cadastrar p-2" to={`${URL_USERS}/create`}>
                            Cadastrar
                        </Link>
                    </div>
                </div>

            </form>
        </div>
    );
}

export default Login;