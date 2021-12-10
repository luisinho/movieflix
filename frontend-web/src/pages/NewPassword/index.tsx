import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ButtonBack from 'core/components/ButtonBack';
import ButtonSubmit from 'core/components/ButtonSubmit';
import { makeRequest } from 'core/utils/request';
import { URL_USERS_RESET, URL_HOME_LOGIN } from 'core/utils/ApiUrl';
import { STATUS_200 } from 'core/utils/HttpStatus';
import history from 'core/utils/history';

import './styles.scss';
import UserLoad from 'pages/Loaders/components/UserLoad';

type FormData = {
    id: number;
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
    codeRequestPassword: string;
}

const NewPassword = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (formData: FormData) => {

        setIsLoading(true);

        makeRequest({ method: 'PUT', url: URL_USERS_RESET, data: formData })
            .then(response => {

                if (response.status === STATUS_200) {

                    toast.success("Senha alterada com sucesso.", {
                        className: 'toast-notification',
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1300,
                        onClose: backHomeLogin
                    });
                }

            }).catch((err: AxiosError) => {

                if (err.response?.data.status === 500) {

                    toast.error(err.response?.data.message, {
                        className: 'toast-notification',
                        position: toast.POSITION.TOP_CENTER
                    });

                } else {

                    toast.warn(err.response?.data.message, {
                        className: 'toast-notification',
                        position: toast.POSITION.TOP_CENTER
                    });
                }

            }).finally(() => {
                reset();
                setIsLoading(false);
            });
    }

    const backHomeLogin = () => {

        const from = { pathname: URL_HOME_LOGIN };

        history.replace(from);
    }

    return (
        <div className="new-password-main">

            <div className="new_password-title">
                Criar nova senha
            </div>

            {isLoading ? <UserLoad /> : ('')}

            <form className="padding-top-form" onSubmit={handleSubmit(onSubmit)}>

                <div className="p-1">
                    <input
                        type="email"
                        className={`form-control input-forms ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="Digite o e-mail"
                        {...register("email", {
                            required: "Campo email obrigatório",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Email inválido"
                            }
                        })}
                    />
                    {errors.email && (
                        <div className="invalid-feedback d-block">
                            {errors.email.message}
                        </div>
                    )}
                </div>

                <div className="p-1">
                    <input
                        type="text"
                        className={`form-control input-forms ${errors.codeRequestPassword ? 'is-invalid' : ''}`}
                        placeholder="Digite aqui o código enviado no seu e-mail"
                        {...register("codeRequestPassword", { required: "Campo Senha obrigatório.", maxLength: 15 })}
                    />
                    {errors.codeRequestPassword && (
                        <div className="invalid-feedback d-block">
                            {errors.codeRequestPassword.message}
                        </div>
                    )}
                </div>

                <div className="p-1">
                    <input
                        type="password"
                        className={`form-control input-forms ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="Digite aqui a Senha"
                        {...register("password", {
                            required: "Campo Senha obrigatório.",
                            pattern: {
                                value: /^[0-9a-fA-F]{4,8}$/i,
                                message: "A senha deve conter somente número de 4 a 8 digitos!"
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
                    <input
                        type="password"
                        className={`form-control input-forms ${errors.repeatPassword ? 'is-invalid' : ''}`}
                        placeholder="Repita aqui a Senha"
                        {...register("repeatPassword", {
                            required: "Campo Repita aqui a Senha obrigatório.",
                            pattern: {
                                value: /^[0-9a-fA-F]{4,8}$/i,
                                message: "A senha deve conter somente número de 4 a 8 digitos!"
                            }
                        })}
                    />
                    {errors.repeatPassword && (
                        <div className="invalid-feedback d-block">
                            {errors.repeatPassword.message}
                        </div>
                    )}
                </div>

                <div className="div-btns">

                    <div className="p-1">
                        <ButtonBack actionUrl={''} />
                    </div>

                    <div className="p-1">
                        <ButtonSubmit label={'Alterar'} />
                    </div>

                </div>

            </form>

            <ToastContainer />

        </div>
    );
}

export default NewPassword;