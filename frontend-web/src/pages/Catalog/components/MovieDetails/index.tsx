import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';

import Sinopse from './components/Sinopse';
import { Movie } from 'core/types/Movie';

import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';

import MoveImgLoad from './../../components/Loaders/SinopseLoad';
import { getAccessTokenDecoded, isAllowedByRole } from 'core/utils/auth';
import { makePrivateRequest } from 'core/utils/request';
import { URL_MOVIES } from 'core/utils/ApiUrl';
import { STATUS_200 } from 'core/utils/HttpStatus';

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
            .then(response => {

                if (response.status === STATUS_200) {
                    setMovie(response.data);
                }
            })
            .catch((err: AxiosError) => {
                console.log('Ocorreu um erro: ', err);
            }).finally(() => {

            });

    }, [movieId]);

    return (
        <div>
            { movie ? (<Sinopse movie={movie} />) :
                <div className="load-sinopse">
                    <MoveImgLoad />
                </div>
            }
            { movie && isAllowedByRole(authorities) && (<ReviewForm moveId={movie.id} />)}
            { movie && !isAllowedByRole(authorities) && (<ReviewList reviewMoveId={movie.id} newQuantityReview={0} />)}
        </div>
    );
}

export default MovieDetails;