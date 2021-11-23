import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import Moment from 'react-moment';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UserResponse } from 'core/types/User';
import { makePrivateRequest } from 'core/utils/request';

import { URL_USERS, URL_USERS_DISABLE } from 'core/utils/ApiUrl';
import { STATUS_200 } from 'core/utils/HttpStatus';
import history from 'core/utils/history';
import UserSearch from '../UserSearch';
import Pagination from 'core/components/Pagination';

import './styles.scss';

const UserList = () => {

    const [usersResponse, setUsersResponse] = useState<UserResponse>();

    const [activePage, setActivePage] = useState(0);

    const [selectedField, setSelectedField] = useState('');

    const [fieldValue, setFieldValue] = useState('');

    const getUsers = useCallback(() => {

        const params = {
            page: activePage,
            linesPerPage: 6,
            field: selectedField,
            fieldValue: fieldValue
        }

        makePrivateRequest({ url: URL_USERS, params: params })
            .then(response => {

                if (response.status === STATUS_200) {
                    setUsersResponse(response.data);
                }

            }).catch((err: AxiosError) => {

                console.log('Ocorreu um erro: ', err);

                toast.error("Ocorreu um erro ao listar os usuários!", {
                    className: 'toast-notification',
                    position: toast.POSITION.TOP_CENTER
                });

            }).finally(() => {
            });

    }, [activePage, selectedField, fieldValue]);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const newUser = () => {
        history.replace(`${URL_USERS}/create`);
    }

    const handleDisable = (id: number) => {

        makePrivateRequest({ method: 'PUT', url: `${URL_USERS_DISABLE}/${id}` })
            .then(response => {

                if (response.status === STATUS_200) {

                    toast.success("Usuário desativado com sucesso.", {
                        className: 'toast-notification',
                        position: toast.POSITION.TOP_CENTER
                    });

                    getUsers();
                }

            }).catch((err: AxiosError) => {

                console.log('Ocorreu um erro: ', err);

                toast.error("Ocorreu um erro ao desativar o usuário!", {
                    className: 'toast-notification',
                    position: toast.POSITION.TOP_CENTER
                });

            }).finally(() => {
            });
    }

    const handleSearch = (field: string, fieldValue: string) => {
        setSelectedField(field);
        setFieldValue(fieldValue);
        getUsers();
    }

    const handleCleanFilter = () => {
        setSelectedField('');
        setFieldValue('');
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
                    <UserSearch
                        field={selectedField}
                        fieldValue={fieldValue}
                        handleSearch={handleSearch}
                        handleCleanFilter={handleCleanFilter}
                    />
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

                {usersResponse && (
                    <Pagination
                        totalPages={usersResponse.totalPages}
                        activePage={activePage}
                        onChange={page => setActivePage(page)}
                    />
                )}

            </div>

            <ToastContainer />
        </>
    );
}

export default UserList;