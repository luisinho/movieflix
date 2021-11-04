import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import Moment from 'react-moment';

import { UserResponse } from 'core/types/User';
import { makePrivateRequest } from 'core/utils/request';
import { URL_USERS } from 'core/utils/ApiUrl';
import history from 'core/utils/history';

import './styles.scss';
import UserSearch from '../UserSearch';

const UserList = () => {

    const [usersResponse, setUsersResponse] = useState<UserResponse>();

    useEffect(() => {

        /*const params = {
            page: activePage,
            linesPerPage: 4,
            movieId: reviewMoveId
        }*/

        makePrivateRequest({ url: URL_USERS })
            .then(response => {
                setUsersResponse(response.data);
            }).catch((err: AxiosError) => {
                console.log('Ocorreu um erro: ', err);
            }).finally(() => {
            });

        console.log('usersResponse', usersResponse);

    }, []);

    const newUser = () => {
        history.replace(`${URL_USERS}/create`);
    }

    const handleDisable = (id: number) => {
        console.log(id);
    }

    return (

        <>
            <div id="divRowSearch" className="d-flex flex-row">

                <div className="user-new">
                    <button onClick={() => newUser()} className="btn btn-primary">
                        Novo Usuário
                    </button>
                </div>

                <div className="user-search">
                    <UserSearch />
                </div>

            </div>

            <div className="user-list-main">

                <div className="d-flex flex-column">

                    <div className="user-list-header d-flex flex-row">

                        <div className="flex-fill text-left w-25">
                            Nome
                        </div>

                        <div className="flex-fill text-left w-25">
                            Email
                        </div>

                        <div className="flex-fill text-center w-25">
                            Status
                        </div>

                        <div className="flex-fill text-center w-25">
                            Criado
                        </div>

                        <div className="flex-fill w-25">

                        </div>

                    </div>

                </div>

                {usersResponse?.content.map(user =>

                    <div key={user.id} className="d-flex flex-column">

                        <div className="user-list d-flex flex-row">

                            <div className="flex-fill text-left w-25">
                                {user.name}
                            </div>

                            <div className="flex-fill text-left w-25">
                                {user.email}
                            </div>

                            <div className="flex-fill text-center w-25">
                                {user.active === true ? 'Ativo' : 'Desativado'}
                            </div>

                            <div className="flex-fill text-center w-25">
                                <Moment format="DD/MM/YYYY">{user?.createdAt}</Moment>
                            </div>

                            <div className="d-flex flex-row flex-fill w-25">
                                <Link to={`${URL_USERS}/${user.id}`} className="user-edit">
                                    Editar
                                </Link>

                                <div className="user-disable" onClick={() => handleDisable(user.id)}>
                                    Desativar
                                </div>
                            </div>

                        </div>

                    </div>
                )}

            </div>

        </>
    );
}

export default UserList;