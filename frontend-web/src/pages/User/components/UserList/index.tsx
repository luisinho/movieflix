import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import Moment from 'react-moment';

import { UserResponse } from 'core/types/User';
import { makePrivateRequest } from 'core/utils/request';
import { URL_USERS } from 'core/utils/ApiUrl';
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
                setUsersResponse(response.data);
            }).catch((err: AxiosError) => {
                console.log('Ocorreu um erro: ', err);
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
        console.log(id);
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

        </>
    );
}

export default UserList;