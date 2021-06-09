import { useEffect, useState } from 'react';

import GenreComboBox from '../Genre/components/ComboBox';
import { MoviesResponse } from 'core/types/Movie';
import MovieCard from './components/MovieCard';
import './styles.scss';
import { makePrivateRequest } from 'core/utils/request';
import { URL_MOVIES } from 'core/utils/ApiUrl';
import { AxiosError } from 'axios';

const Catalog = () => {

    const [moviesResponse, setMoviesResponse] = useState<MoviesResponse>();

    const [activePage, setActivePage] = useState(0);

    useEffect(() => {

        const params = {
            page: activePage,
            linesPerPage: 10
        }

        makePrivateRequest({ url: URL_MOVIES, params: params })
            .then(response => {
                setMoviesResponse(response.data);
            }).catch((err: AxiosError) => {
                console.log('err', err);
            }).finally(() => {
            });

    }, []);

    return (
        <div>
            <div className="card-combo-box">
                <GenreComboBox />
            </div>
            <div className="catalog-movie">
                {
                    moviesResponse?.content.map(movie =>
                        <MovieCard key={movie.id} movie={movie} />
                    )
                }
            </div>
        </div>
    );
}

export default Catalog;