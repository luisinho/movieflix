import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import GenreComboBox from '../Genre/components/ComboBox';
import { MoviesResponse } from 'core/types/Movie';
import MovieCard from './components/MovieCard';
import { makePrivateRequest } from 'core/utils/request';
import { URL_MOVIES } from 'core/utils/ApiUrl';
import Pagination from 'core/components/Pagination';
import './styles.scss';
import { Link } from 'react-router-dom';

const Catalog = () => {

    const [moviesResponse, setMoviesResponse] = useState<MoviesResponse>();

    const [activePage, setActivePage] = useState(0);

    const [selectedGenreId, setSelectedGenreId] = useState('0');

    useEffect(() => {

        const params = {
            page: activePage,
            linesPerPage: 10,
            genreId: Number(selectedGenreId)
        }

        makePrivateRequest({ url: URL_MOVIES, params: params })
            .then(response => {
                setMoviesResponse(response.data);
            }).catch((err: AxiosError) => {
                console.log('err', err);
            }).finally(() => {
            });

    }, [activePage, selectedGenreId]);

    return (
        <div>
            <div className="card-combo-box">
                <GenreComboBox
                    onChange={genre => {
                        setActivePage(0);
                        setSelectedGenreId(genre?.target.value);
                    }}
                />
            </div>
            <div className="catalog-movie">
                {
                    moviesResponse?.content.map(movie =>
                        <Link to={`${URL_MOVIES}/${movie.id}`} key={movie.id}>
                            <MovieCard movie={movie} />
                        </Link>
                    )
                }
            </div>
            { moviesResponse && (
                <Pagination
                    totalPages={moviesResponse.totalPages}
                    onChange={page => setActivePage(page)}
                />
            )}
        </div>
    );
}

export default Catalog;