import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import Sinopse from './components/Sinopse';
import ReviewForm from './components/ReviewForm';
import { Movie } from 'core/types/Movie';

import { getAccessTokenDecoded, isAllowedByRole } from 'core/utils/auth';
import { makePrivateRequest } from 'core/utils/request';
import { URL_MOVIES } from 'core/utils/ApiUrl';
import './styles.scss';

type ParamsType = {
    movieId: string;
}

const MovieDetails = () => {

    const { authorities } = getAccessTokenDecoded();

    const { movieId } = useParams<ParamsType>();

    const [movie, setMovie] = useState<Movie>();

    useEffect(() => {

        makePrivateRequest({ url: `${URL_MOVIES}/${movieId}` })
            .then(response => setMovie(response.data))
            .catch((err: AxiosError) => {
                console.log('Ocorreu um erro: ', err);
            }).finally(() => {
            });

    }, [movieId])

    return (
        <div>
            { movie && (<Sinopse movie={movie} />)}
            { movie && isAllowedByRole(authorities) && (<ReviewForm moveId={movie.id} />)}
        </div>
    );
}

export default MovieDetails;