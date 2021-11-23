import { useCallback, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MoveCardLoader from './components/Loaders/MoveCardLoader';
import GenreComboBox from '../Genre/components/ComboBox';
import { MoviesResponse } from 'core/types/Movie';
import MovieCard from './components/MovieCard';
import { makePrivateRequest } from 'core/utils/request';
import { URL_MOVIES } from 'core/utils/ApiUrl';
import Pagination from 'core/components/Pagination';
import { STATUS_200 } from 'core/utils/HttpStatus';

import './styles.scss';

const Catalog = () => {

    const [moviesResponse, setMoviesResponse] = useState<MoviesResponse>();

    const [activePage, setActivePage] = useState(0);

    const [selectedGenreId, setSelectedGenreId] = useState('0');

    const [isLoading, setIsLoading] = useState(false);

    const getMovies = useCallback(() => {

        const params = {
            page: activePage,
            linesPerPage: 10,
            genreId: Number(selectedGenreId)
        }

        setIsLoading(true);
        makePrivateRequest({ url: URL_MOVIES, params: params })
            .then(response => {

                if (response.status === STATUS_200) {
                    setMoviesResponse(response.data);
                }

            }).catch((err: AxiosError) => {

                console.log('Ocorreu um erro ao listar os filmes', err);

                toast.error("Ocorreu um erro ao listar os filmes!", {
                    className: 'toast-notification',
                    position: toast.POSITION.TOP_CENTER
                });

            }).finally(() => {
                setIsLoading(false);
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
                {isLoading ? <MoveCardLoader /> : (
                    moviesResponse?.content.map(movie =>
                        <Link to={`${URL_MOVIES}/${movie.id}`} key={movie.id}>
                            <MovieCard movie={movie} />
                        </Link>
                    )
                )}
            </div>
            { moviesResponse && (
                <Pagination
                    totalPages={moviesResponse.totalPages}
                    activePage={activePage}
                    onChange={page => setActivePage(page)}
                />
            )}

            <ToastContainer />
        </div>
    );
}

export default Catalog;