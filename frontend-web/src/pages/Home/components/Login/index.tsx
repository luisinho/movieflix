import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { useHistory, useLocation } from 'react-router-dom';

import ButtonIcon from 'core/components/Buttonicon';
import { saveSessionData } from 'core/utils/auth';
import { makeLogin } from 'core/utils/request';
import './styles.scss';

type FormData = {
    username: string;
    password: string;
}

type LocationState = {
    from: string;
}

const Login = () => {

    const { register, handleSubmit } = useForm<FormData>();

    const [hasError, setHasError] = useState(false);

    const [msgError, setMsgError] = useState('');

    const history = useHistory();

    const location = useLocation<LocationState>();

    const { from } = location.state || { from: { pathname: "/movies" } };


    const onSubmit = (data: FormData) => {

        makeLogin(data).then(response => {

            setHasError(false);
            setMsgError('');
            saveSessionData(response.data);
            history.replace(from);
            // history.push(from);

        }).catch((err: AxiosError) => {
            setHasError(true);
            setMsgError(err.response?.data.error_description);
        });
    }

    return (
        <div className="login-main">

            <h1 className="login-title">
                Login
            </h1>

            {hasError && (

                <div className="alert alert-primary mt-5 login-font-alert">
                    {msgError}
                </div>
            )}

            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    className="form-control login-input margin-bottom-30"
                    placeholder="Email"
                    {...register("username", { required: true })}
                />
                <input
                    type="password"
                    className="form-control login-input login-input-button"
                    placeholder="Senha"
                    {...register("password", { required: true })}
                />

                <div className="login-btn-icon">
                    <ButtonIcon />
                </div>

            </form>
        </div>
    );
}

export default Login;