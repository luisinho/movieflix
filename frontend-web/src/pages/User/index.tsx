import ButtonBack from 'core/components/ButtonBack';
import ButtonRegister from 'core/components/ButtonRegister';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';

import { makeRequest } from 'core/utils/request';
import { URL_USERS } from 'core/utils/ApiUrl';

import './styles.scss';

type FormData = {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
}

const User = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

    const onSubmit = (formData: FormData) => {

        makeRequest({ method: 'POST', url: URL_USERS, data: formData })
            .then(response => {
                if (response.status === 201) {

                }
            }).catch((err: AxiosError) => {
                console.log('Ocorreu um erro: ', err.response);
            }).finally(() => {
                reset();
            });
    }

    return (
        <div className="user-main">

            <div className="user-title">
                Cadastrar Usuário
            </div>

            <form className="user-form" onSubmit={handleSubmit(onSubmit)}>

                <div className="margin-bottom-30">
                    <input
                        type="text"
                        className={`form-control login-input ${errors.name ? 'is-invalid' : ''}`}
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
                        className={`form-control login-input ${errors.email ? 'is-invalid' : ''}`}
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

                <div className="d-flex flex-row justify-content-between margin-bottom-30">
                    <div className="user-input-password">
                        <input
                            type="password"
                            className={`form-control login-input ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="Digite aqui a Senha"
                            {...register("password", { required: "Campo Senha obrigatório." })}
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
                            className={`form-control login-input ${errors.repeatPassword ? 'is-invalid' : ''}`}
                            placeholder="Repita aqui a Senha"
                            {...register("repeatPassword", { required: "Campo Repita aqui a Senha obrigatório." })}
                        />
                        {errors.repeatPassword && (
                            <div className="invalid-feedback d-block">
                                {errors.repeatPassword.message}
                            </div>
                        )}
                    </div>

                </div>

                <div className="user-btn">

                    <div className="p-1">
                        <ButtonBack />
                    </div>

                    <div className="p-1">
                        <ButtonRegister />
                    </div>

                </div>

            </form>
        </div>
    );
}

export default User;