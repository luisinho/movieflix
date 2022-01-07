import React, { useEffect, useState } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { AxiosError } from 'axios';

import { URL_REVIEWS } from '../../../utils/ApiUrl';
import { STATUS_200 } from '../../../utils/HttpStatus';
import { makePrivateRequest } from '../../../services/request';

import { ReviewsResponse } from '../../../entities/Review';

import reviewStar from '../../../assets/review-star.png';
import { text } from '../../../styles';
import { listReviewTheme } from '../styles';

type Props = {
    movieIdReview: number;
}

const ListReview: React.FC<Props> = ({ movieIdReview }) => {

    const [reviewsResponse, setReviewsResponse] = useState<ReviewsResponse>();

    const [activePage, setActivePage] = useState(0);

    useEffect(() => {

        const params = {
            page: activePage,
            linesPerPage: 4,
            movieId: movieIdReview
        }

        makePrivateRequest({ url: URL_REVIEWS, params: params })
            .then(response => {

                if (response.status === STATUS_200) {
                    setReviewsResponse(response.data);
                }

            }).catch((err: AxiosError) => {

                console.log('Ocorreu um erro ao listar as avaliações: ', err);

            }).finally(() => {

            });

    }, [movieIdReview]);

    return (

        <View style={listReviewTheme.listCard}>

            {reviewsResponse?.content.map(review =>

                <View key={review.id}>

                    <>

                        <View style={listReviewTheme.reviewImgContainer}>

                            <Image source={reviewStar} style={listReviewTheme.reviewImg} />

                            <Text style={listReviewTheme.reviewNameUser}>{review.user.name}</Text>

                            <Text style={listReviewTheme.reviewDate}>Criado: 03/12/2021 23:31:59</Text>

                        </View>

                        <View style={listReviewTheme.reviewContent}>

                            <Text style={text.synopsisDescription}>
                                {review.text}-{review.id}
                            </Text>

                        </View>

                    </>

                </View>
            )}

        </View>
    );
}

export default ListReview;