import { useState } from 'react';

import './styles.scss';

type Props = {
    field: string;
    fieldValue: string;
    handleSearch: (field: string, fieldValue: string) => void;
    handleCleanFilter: () => void;
}

const UserSearch = ({ field, fieldValue, handleSearch, handleCleanFilter }: Props) => {

    const [enableStatus, setEnableStatus] = useState(false);

    const [selectedField, setSelectedField] = useState('');

    const [selectedFieldValue, setSelectedFieldValue] = useState('');

    const handleField = (value: string) => {

        if (value === 'active') {
            setEnableStatus(true);
        } else {
            setEnableStatus(false);
        }

        setSelectedField(value);

        field = selectedField;
    }

    const handleFieldValue = (value: string) => {

        setSelectedFieldValue(value);

        fieldValue = selectedFieldValue;
    }

    const handleCleanStatus = () => {
        setEnableStatus(false);
        setSelectedField('');
        setSelectedFieldValue('');
    }

    return (

        <div className="d-flex flex-column">

            <form>

                <div className="d-flex flex-row">

                    <div className="p-1">
                        <select id="teste1" onChange={event => handleField(event.target.value)} className="form-select">
                            <option value="">Pesquisar por</option>
                            <option value="email">E-mail</option>
                            <option value="name">Nome</option>
                            <option value="active">Status</option>
                        </select>
                    </div>

                    {!enableStatus && (
                        <div className="flex-fill p-1">
                            <input type="text" onBlur={event => handleFieldValue(event.target.value)} className="form-control" />
                        </div>
                    )}

                    {enableStatus && (
                        <div className="flex-fill p-1">
                            <select id="teste2" onChange={event => handleFieldValue(event.target.value)} className="form-select">
                                <option value="">Selecione o status</option>
                                <option value="true">Ativado</option>
                                <option value="false">Desativado</option>
                            </select>
                        </div>
                    )}

                    <div className="p-1">
                        <button type="button" onClick={() => handleSearch(selectedField, selectedFieldValue)} className="btn btn-primary">
                            Pesquisar
                        </button>
                    </div>

                    <div className="p-1">
                        <button
                            type="reset"
                            onClick={() => {
                                handleCleanFilter();
                                handleCleanStatus()
                            }}
                            className="btn btn-primary">
                            Limpar Filtro
                        </button>
                    </div>

                </div>

            </form>

        </div>
    );
}

export default UserSearch;