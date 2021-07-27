import { useCallback, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';

import GenreComboBox from '../Genre/components/ComboBox';
import { MoviesResponse } from 'core/types/Movie';
import MovieCard from './components/MovieCard';
import { makePrivateRequest } from 'core/utils/request';
import { URL_MOVIES } from 'core/utils/ApiUrl';
import Pagination from 'core/components/Pagination';
import './styles.scss';

const Catalog = () => {

    const [moviesResponse, setMoviesResponse] = useState<MoviesResponse>();

    const [activePage, setActivePage] = useState(0);

    const [selectedGenreId, setSelectedGenreId] = useState('0');

    const getMovies = useCallback(() => {

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

    useEffect(() => {
        getMovies();
    }, [getMovies]);

    const handleChangeId = (genreId: string) => {
        setActivePage(0);
        setSelectedGenreId(genreId);
    }

    return (
        <div>
            <div className="card-combo-box">
                <GenreComboBox
                    genreId={selectedGenreId}
                    handleChangeId={handleChangeId}
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
                    activePage={activePage}
                    onChange={page => setActivePage(page)}
                />
            )}
        </div>
    );
}

export default Catalog;