import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { makeRequest } from 'core/utils/request';
import history from 'core/utils/history';
import ButtonSubmit from 'core/components/ButtonSubmit';
import ButtonBack from 'core/components/ButtonBack';
import { URL_EMAIL, URL_USERS_PROCESS } from 'core/utils/ApiUrl';

import './styles.scss';

type FormData = {
    fromEmail: string;
    fromName: string;
    replyTo: string;
    to: string;
    subject: string;
    body: string;
    contentType: string;
    userId: number;
    statusCode: number;
}

const Email = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = (formData: FormData) => {

        makeRequest({ method: 'POST', url: URL_EMAIL, data: formData })
            .then(response => {

                if (response.status === 202) {

                    const from = { pathname: URL_USERS_PROCESS };

                    history.replace(from);
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

            });
    }

    return (
        <div className="email-main">

            <div className="email-title">
                Enviar email
            </div>

            <form className="user-form" onSubmit={handleSubmit(onSubmit)}>

                <div className="email-sub-title">
                    Será enviado um E-mail, com um código para você criar uma nova senha!
                </div>

                <div className="p-1">
                    <input
                        type="email"
                        className={`form-control input-forms ${errors.to ? 'is-invalid' : ''}`}
                        placeholder="Digite o e-mail"
                        {...register("to", {
                            required: "Campo email obrigatório",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Email inválido"
                            }
                        })}
                    />
                    {errors.to && (
                        <div className="invalid-feedback d-block">
                            {errors.to.message}
                        </div>
                    )}
                </div>

                <div className="div-btns">
                    <div className="p-1">
                        <ButtonBack />
                    </div>

                    <div className="p-1">
                        <ButtonSubmit label={'Enviar'} />
                    </div>
                </div>

            </form>

            <ToastContainer />

        </div>
    );
}

export default Email;