import ButtonBack from 'core/components/ButtonBack';
import ButtonRegister from 'core/components/ButtonRegister';
import { useForm } from 'react-hook-form';

import './styles.scss';

type FormData = {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
}

const Usuario = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = (formData: FormData) => {
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
                        className="form-control user-input"
                        placeholder="Nome"
                        {...register("name")}
                    />
                </div>

                <div className="margin-bottom-30">
                    <input
                        type="email"
                        className="form-control user-input"
                        placeholder="Email"
                        {...register("email")}
                    />
                </div>

                <div className="d-flex flex-row justify-content-between margin-bottom-30">
                    <div className="user-input-password">
                        <input
                            type="password"
                            className="form-control user-input"
                            placeholder="Digite aqui a Senha"
                            {...register("password")}
                        />
                    </div>

                    <div className="user-input-password">
                        <input
                            type="password"
                            className="form-control user-input"
                            placeholder="Repita aqui a Senha"
                            {...register("repeatPassword")}
                        />
                    </div>

                </div>

                <div className="user-btn">
                    <div className="user-btn-register-back">
                        <ButtonBack />
                    </div>
                    <div className="user-btn-register-back">
                        <ButtonRegister />
                    </div>
                </div>

            </form>
        </div>
    );
}

export default Usuario;