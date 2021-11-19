import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GenresResponse } from 'core/types/Genre';
import { makePrivateRequest } from 'core/utils/request';
import { URL_GENRES } from 'core/utils/ApiUrl';
import { STATUS_200 } from 'core/utils/HttpStatus';

import './styles.scss';

type Props = {
    genreId: string;
    handleChangeId: (genreId: string) => void;
}

const GenreComboBox = ({ genreId, handleChangeId }: Props) => {

    const [genresResponse, setGenresResponse] = useState<GenresResponse>();

    useEffect(() => {

        makePrivateRequest({ url: URL_GENRES })
            .then(response => {

                if (response.status === STATUS_200) {
                    setGenresResponse({ content: response.data });
                }

            }).catch((err: AxiosError) => {

                console.log('Ocorreu um erro ao listar os generos:', err);

                toast.error('Ocorreu um erro ao listar os generos!', {
                    className: 'toast-notification',
                    position: toast.POSITION.TOP_CENTER
                });

            }).finally(() => {
            });
    }, []);

    return (
        <div>
            <select value={genreId} name="genre" className="combo-box-genre" onChange={event => handleChangeId(event.target.value)}>
                <option value="0" className="option-genre">Selecione o genero</option>
                {
                    genresResponse?.content.map(genre =>
                        <option key={genre.id} value={genre.id} className="option-genre">
                            {genre.name}
                        </option>
                    )
                }
            </select>

            <ToastContainer />
        </div>
    );
}

export default GenreComboBox;