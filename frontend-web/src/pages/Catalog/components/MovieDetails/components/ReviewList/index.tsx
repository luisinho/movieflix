import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import Moment from 'react-moment';

import { ReactComponent as ReviewStarImage } from 'core/assets/images/review-star.svg';
import { Movie } from 'core/types/Movie';
import { URL_MOVIES } from 'core/utils/ApiUrl';
import { makePrivateRequest } from 'core/utils/request';
import './styles.scss';

type Props = {
    reviewMoveId: number;
    newQuantityReview: number;
}

const ReviewList = ({ reviewMoveId, newQuantityReview }: Props) => {

    const [movie, setMovie] = useState<Movie>();

    useEffect(() => {

        makePrivateRequest({ url: `${URL_MOVIES}/${reviewMoveId}` })
            .then(response => {
                setMovie(response.data);
            }).catch((err: AxiosError) => {
                console.log('Ocorreu um erro: ', err);
            }).finally(() => {
            });

    }, [reviewMoveId, newQuantityReview]);

    return (
        <div className="main-review-list">

            {movie?.reviews.map(review =>
                <>
                    <div key={review.id} className="d-flex flex-column">

                        <div className="d-flex flex-row">

                            <div className="d-flex flex-row flex-fill">
                                <ReviewStarImage className="review-img-star" />
                                <div className="review-user-name">
                                    {review.user.name}
                                </div>
                            </div>

                            <div className="review-user-dt-create flex-fill">
                                Criado:<Moment className="p-1" format="DD/MM/YYYY HH:mm:ss">{review?.createdAt}</Moment>
                            </div>

                        </div>

                    </div>

                    <div className="review-list">
                        {review.text}
                    </div>
                </>
            )}
        </div>
    );
}

export default ReviewList;