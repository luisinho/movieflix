import './styles.scss';

const UserSearch = () => {
    return (

        <div className="d-flex flex-column">

            <div className="d-flex flex-row">

                <div className="p-1">
                    <select className="form-select">
                        <option value="">Pesquisar por</option>
                        <option value="email">E-mail</option>
                        <option value="name">Nome</option>
                        <option value="active">Status</option>
                    </select>
                </div>

                <div className="flex-fill p-1">
                    <input type="text" className="form-control" />
                </div>

                <div className="p-1">
                    <button className="btn btn-primary">
                        Pesquisar
                        </button>
                </div>

                <div className="p-1">
                    <button className="btn btn-primary">
                        Limpar Filtro
                        </button>
                </div>

            </div>

        </div>


    );
}

export default UserSearch;