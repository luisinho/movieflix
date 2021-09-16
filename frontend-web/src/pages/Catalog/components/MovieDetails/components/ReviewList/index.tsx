import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import Moment from 'react-moment';

import { ReactComponent as ReviewStarImage } from 'core/assets/images/review-star.svg';
import { ReviewsResponse } from 'core/types/Review';
import { URL_REVIEWS } from 'core/utils/ApiUrl';
import { makePrivateRequest } from 'core/utils/request';
import Pagination from 'core/components/Pagination';
import './styles.scss';

type Props = {
    reviewMoveId: number;
    newQuantityReview: number;
}

const ReviewList = ({ reviewMoveId, newQuantityReview }: Props) => {

    const [reviewsResponse, setReviewsResponse] = useState<ReviewsResponse>();

    const [activePage, setActivePage] = useState(0);

    useEffect(() => {

        const params = {
            page: activePage,
            linesPerPage: 4,
            movieId: reviewMoveId
        }

        makePrivateRequest({ url: URL_REVIEWS, params: params })
            .then(response => {
                setReviewsResponse(response.data);
            }).catch((err: AxiosError) => {
                console.log('Ocorreu um erro: ', err);
            }).finally(() => {
            });

    }, [activePage, reviewMoveId, newQuantityReview]);

    return (
        <div className="main-review-list">

            {reviewsResponse?.content.map(review =>
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

            { reviewsResponse && reviewsResponse.content.length > 0 && (
                <Pagination
                    totalPages={reviewsResponse.totalPages}
                    activePage={activePage}
                    onChange={page => setActivePage(page)} />
            )}
        </div>
    );
}

export default ReviewList;