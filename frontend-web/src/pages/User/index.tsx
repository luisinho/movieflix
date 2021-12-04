import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AxiosError, AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Role, RoleResponse } from 'core/types/Role';
import ButtonBack from 'core/components/ButtonBack';
import ButtonSubmit from 'core/components/ButtonSubmit';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import { URL_USERS, URL_USERS_ROLE } from 'core/utils/ApiUrl';
import { STATUS_200, STATUS_201, STATUS_400, STATUS_500 } from 'core/utils/HttpStatus';
import { getAccessTokenDecoded } from 'core/utils/auth';
import history from 'core/utils/history';

import './styles.scss';

type ParamsType = {
    userId: string;
}

type FormData = {
    id: number;
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
    active: boolean;
    idRole: number;
    roles: Role[];
}

const NewUser = () => {

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormData>();

    const [roleResponse, setRoleResponse] = useState<RoleResponse>();

    const [idRoleEdit, setIdRoleEdit] = useState<number>(0);

    const { userId } = useParams<ParamsType>();

    const isEditing = userId !== 'create' ? true : false;

    const currentUserData = getAccessTokenDecoded();

    const url = currentUserData.user_name ? URL_USERS : "";

    const formTitle = isEditing ? 'Editar usuário' : 'Cadastrar usuário';

    const labelButton = isEditing ? 'Alterar' : 'Cadastrar';

    useEffect(() => {

        if (isEditing) {

            makePrivateRequest({ url: `${URL_USERS}/${userId}` })
                .then(response => {

                    if (response.status === STATUS_200) {

                        setValue('id', response.data.id);
                        setValue('name', response.data.name);
                        setValue('email', response.data.email);
                        setValue('active', response.data.active);

                        if (response.data.roles !== null && response.data.roles !== undefined) {

                            let roles: Role[] = response.data.roles;

                            roles.forEach(role => {
                                setValue('idRole', role.id);
                                setIdRoleEdit(role.id);
                            });
                        }
                    }

                }).catch((err: AxiosError) => {
                    err.response && showMensage(err.response);
                }).finally(() => {

                });
        }

        if (currentUserData.user_name !== null && currentUserData.user_name !== undefined) {

            makePrivateRequest({ url: URL_USERS_ROLE })
                .then(response => {

                    if (response.status === STATUS_200) {
                        setRoleResponse({ content: response.data });
                    }

                }).catch((err: AxiosError) => {

                    console.log('Ocorreu um erro: ', err);

                    toast.error("Ocorreu um erro ao listar o perfil!", {
                        className: 'toast-notification',
                        position: toast.POSITION.TOP_CENTER
                    });

                }).finally(() => {

                });
        }

    }, [isEditing, userId, setValue, currentUserData.user_name]);

    const onSubmit = (formData: FormData) => {

        const FORM_METHOD = isEditing ? 'PUT' : 'POST';

        const FORM_URL = isEditing ? `${URL_USERS}/${formData.id}` : URL_USERS;

        makeRequest({ method: FORM_METHOD, url: FORM_URL, data: formData })
            .then(response => {

                if (response.status === STATUS_200) {

                    toast.success("Usuário atualizado com sucesso.", {
                        onClick: () => handleListUser(),
                        className: 'toast-notification',
                        position: toast.POSITION.TOP_CENTER
                    });

                } else if (response.status === STATUS_201) {

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

    const handleListUser = () => {

        history.replace(URL_USERS);
    }

    const showMensage = (response: AxiosResponse) => {

        if (response.status === STATUS_400) {

            toast.warn(response.data.message, {
                className: 'toast-notification',
                position: toast.POSITION.TOP_CENTER
            });

        } else if (response.status === STATUS_500) {

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
                        <select
                            className="form-select"
                            {...register("idRole", { required: "Campo Perfil obrigatório." })}>
                            {!isEditing && (<option value="">Selecione o perfil</option>)}
                            {roleResponse?.content.map(role =>
                                <option key={role.id} value={role.id} selected={role.id === idRoleEdit}>
                                    {role.description}
                                </option>
                            )}
                        </select>
                        {errors.idRole && (
                            <div className="invalid-feedback d-block">
                                {errors.idRole.message}
                            </div>
                        )}
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