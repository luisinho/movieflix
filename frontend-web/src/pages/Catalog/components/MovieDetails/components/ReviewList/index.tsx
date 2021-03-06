import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import Moment from 'react-moment';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ReactComponent as ReviewStarImage } from 'core/assets/images/review-star.svg';
import { ReviewsResponse } from 'core/types/Review';
import { URL_REVIEWS } from 'core/utils/ApiUrl';
import { makePrivateRequest } from 'core/utils/request';
import Pagination from 'core/components/Pagination';
import { STATUS_200 } from 'core/utils/HttpStatus';
import ReviewListLoad from './../../../../components/Loaders/ReviewListLoad';

import './styles.scss';

type Props = {
    reviewMoveId: number;
    newQuantityReview: number;
}

const ReviewList = ({ reviewMoveId, newQuantityReview }: Props) => {

    const [reviewsResponse, setReviewsResponse] = useState<ReviewsResponse>();

    const [activePage, setActivePage] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const params = {
            page: activePage,
            linesPerPage: 4,
            movieId: reviewMoveId
        }

        setIsLoading(true);

        makePrivateRequest({ url: URL_REVIEWS, params: params })
            .then(response => {

                if (response.status === STATUS_200) {
                    setReviewsResponse(response.data);
                }

            }).catch((err: AxiosError) => {

                console.log('Ocorreu um erro ao listar as avaliações: ', err);

                toast.error("Ocorreu um erro ao listar as avaliações!", {
                    className: 'toast-notification',
                    position: toast.POSITION.TOP_CENTER
                });

            }).finally(() => {
                setIsLoading(false);
            });

    }, [activePage, reviewMoveId, newQuantityReview]);

    return (
        <div className="main-review-list">

            {isLoading ? <ReviewListLoad /> : (

                <div>

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

                </div>
            )}

            { reviewsResponse && reviewsResponse.content.length > 0 && (
                <Pagination
                    totalPages={reviewsResponse.totalPages}
                    activePage={activePage}
                    onChange={page => setActivePage(page)} />
            )}

            <ToastContainer />
        </div>
    );
}

export default ReviewList;