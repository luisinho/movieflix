import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';

import { GenresResponse } from 'core/types/Genre';
import { makePrivateRequest } from 'core/utils/request';
import { URL_GENRES } from 'core/utils/ApiUrl';
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
                setGenresResponse({ content: response.data });
            }).catch((err: AxiosError) => {
                console.log('err', err);
            }).finally(() => {
            });
    }, []);

    return (
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
    );
}

export default GenreComboBox;