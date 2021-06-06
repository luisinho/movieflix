import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AxiosError } from 'axios';

import { makeLogin } from 'core/utils/request';
import { saveSessionData } from 'core/utils/auth';
import { URL_MOVIES } from 'core/utils/ApiUrl';
import ButtonIcon from 'core/components/Buttonicon';
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

    const { from } = location.state || { from: { pathname: URL_MOVIES } };

    const onSubmit = (formData: FormData) => {

        makeLogin(formData).then(response => {

            setHasError(false);
            setMsgError('');
            saveSessionData(response.data);
            history.replace(from);

        }).catch((err: AxiosError) => {
            setHasError(true);
            setMsgError(err.response?.data.error_description);
        }).finally(() => {
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