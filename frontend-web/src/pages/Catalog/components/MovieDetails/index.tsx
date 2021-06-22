import { useParams } from 'react-router-dom';

import Sinopse from './components/Sinopse';
import { Movie } from 'core/types/Movie';

import './styles.scss';
import { useEffect, useState } from 'react';
import { makePrivateRequest } from 'core/utils/request';
import { URL_MOVIES } from 'core/utils/ApiUrl';
import { AxiosError } from 'axios';
import FormAvaliacao from './components/FormAvaliacao';

type ParamsType = {
    movieId: string;
}

const MovieDetails = () => {

    const { movieId } = useParams<ParamsType>();

    const [movie, setMovie] = useState<Movie>();

    useEffect(() => {

        makePrivateRequest({ url: `${URL_MOVIES}/${movieId}` })
            .then(response => setMovie(response.data))
            .catch((err: AxiosError) => {
                console.log('Ocorreu um erro: ', err);
            }).finally(() => {
            })

    }, [movieId])

    return (
        <div>
            { movie && (<Sinopse movie={movie} />)}
            <FormAvaliacao />
        </div>

    );
}

export default MovieDetails;