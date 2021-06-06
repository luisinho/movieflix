import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';

import { GenresResponse } from 'core/types/Genre';
import { makePrivateRequest } from 'core/utils/request';
import { URL_GENRES } from 'core/utils/ApiUrl';
import './styles.scss';

const GenreComboBox = () => {

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
        <select name="genre" className="combo-box-genre">
            {
                genresResponse?.content.map(genre =>
                    <option key={genre.id} value={genre.id}>
                        {genre.name}
                    </option>
                )
            }
        </select>
    );
}

export default GenreComboBox;