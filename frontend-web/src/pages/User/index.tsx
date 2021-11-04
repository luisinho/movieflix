import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AxiosError, AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ButtonBack from 'core/components/ButtonBack';
import ButtonSubmit from 'core/components/ButtonSubmit';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import { URL_USERS } from 'core/utils/ApiUrl';
import { getAccessTokenDecoded } from 'core/utils/auth';

import './styles.scss';

type ParamsType = {
    userId: string;
}

type FormData = {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
    active: boolean;
}

const NewUser = () => {

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormData>();

    const { userId } = useParams<ParamsType>();

    const isEditing = userId !== 'create';

    const currentUserData = getAccessTokenDecoded();

    const url = currentUserData ? URL_USERS : "";

    const formTitle = isEditing ? 'Editar usuário' : 'Cadastrar usuário';

    const labelButton = isEditing ? 'Alterar' : 'Cadastrar';

    useEffect(() => {

        if (isEditing) {

            makePrivateRequest({ url: `${URL_USERS}/${userId}` })
                .then(response => {

                    if (response.status === 200) {

                        setValue('name', response.data.name);
                        setValue('email', response.data.email);
                        setValue('active', response.data.active);
                    }

                }).catch((err: AxiosError) => {
                    err.response && showMensage(err.response);
                }).finally(() => {

                });
        }

    }, [isEditing, userId, setValue]);

    const onSubmit = (formData: FormData) => {

        makeRequest({ method: 'POST', url: URL_USERS, data: formData })
            .then(response => {

                if (response.status === 201) {

                    toast.success("Usuário cadastrado com sucesso.", {
                        className: 'toast-notification',
                        position: toast.POSITION.TOP_CENTER
                    });

                    reset();
                }

            }).catch((err: AxiosError) => {
                err.response && showMensage(err.response);
            }).finally(() => {

            });
    }

    const showMensage = (response: AxiosResponse) => {

        if (response.status === 400) {

            toast.warn(response.data.message, {
                className: 'toast-notification',
                position: toast.POSITION.TOP_CENTER
            });

        } else if (response.status === 500) {

            toast.error(response.data.message, {
                className: 'toast-notification',
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    return (
        <div className="user-main">

            <div className="user-title">
                {formTitle}
            </div>

            <form className="padding-top-form" onSubmit={handleSubmit(onSubmit)}>

                <div className="margin-bottom-30">
                    <input
                        type="text"
                        className={`form-control input-forms ${errors.name ? 'is-invalid' : ''}`}
                        placeholder="Nome"
                        {...register("name", { required: "Campo nome obrigatório." })}
                    />
                    {errors.name && (
                        <div className="invalid-feedback d-block">
                            {errors.name.message}
                        </div>
                    )}
                </div>

                <div className="margin-bottom-30">
                    <input
                        type="email"
                        className={`form-control input-forms ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="Email"
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

                {!isEditing && (

                    <div className="d-flex flex-row justify-content-between margin-bottom-30">
                        <div className="user-input-password">
                            <input
                                type="password"
                                className={`form-control input-forms ${errors.password ? 'is-invalid' : ''}`}
                                placeholder="Digite aqui a Senha aaa"
                                {...register("password", {
                                    required: "Campo Senha obrigatório.",
                                    pattern: {
                                        value: /^[0-9a-fA-F]{4,8}$/i,
                                        message: "A senha deve conter de 4 a 8 caracteres!"
                                    }
                                })}
                            />
                            {errors.password && (
                                <div className="invalid-feedback d-block">
                                    {errors.password.message}
                                </div>
                            )}
                        </div>

                        <div className="user-input-password">
                            <input
                                type="password"
                                className={`form-control input-forms ${errors.repeatPassword ? 'is-invalid' : ''}`}
                                placeholder="Repita aqui a Senha"
                                {...register("repeatPassword", {
                                    required: "Campo Repita aqui a Senha obrigatório.",
                                    pattern: {
                                        value: /^[0-9a-fA-F]{4,8}$/i,
                                        message: "A senha deve conter de 4 a 8 caracteres!"
                                    }
                                })}
                            />
                            {errors.repeatPassword && (
                                <div className="invalid-feedback d-block">
                                    {errors.repeatPassword.message}
                                </div>
                            )}
                        </div>

                    </div>
                )}

                {(currentUserData.user_name || isEditing) && (

                    <div>
                        <select className="form-select">
                            <option>Selecione o perfil</option>
                        </select>
                    </div>
                )}

                {isEditing && (

                    <div className="user-checkbox-status">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            {...register("active")}
                        />
                        <label>
                            &nbsp;Ativo
                    </label>
                    </div>
                )}

                <div className="div-btns">

                    <div className="p-1">
                        <ButtonBack actionUrl={url} />
                    </div>

                    <div className="p-1">
                        <ButtonSubmit label={labelButton} />
                    </div>

                </div>

            </form>
            <ToastContainer />
        </div>
    );
}

export default NewUser;