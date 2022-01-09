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
    newQuantityReview: number;
}

const ListReview: React.FC<Props> = ({ movieIdReview, newQuantityReview }) => {

    const [reviewsResponse, setReviewsResponse] = useState<ReviewsResponse>();

    const [activePage, setActivePage] = useState(0);

    useEffect(() => {

        const params = {
            page: activePage,
            linesPerPage: 3,
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

    }, [movieIdReview, newQuantityReview]);

    const getCreatedDate = (dateParam: string): String => {

        let dateFormat: string = '';

        let creationDate: string = '';

        let creationTime: string = '';

        let dayMonthYear: string[] = [];

        const SPACE: string = ' ';

        if (dateParam.length >= 27) {

            creationDate = dateParam.substring(0, 10);

            creationTime = dateParam.substring(11, 19);

            dayMonthYear = creationDate.split('-');

            dateFormat = `${dayMonthYear[2]}/`;

            dateFormat += `${dayMonthYear[1]}/`;

            dateFormat += `${dayMonthYear[0]}`;

            dateFormat += SPACE;

            dateFormat += creationTime;
        }

        return dateFormat;
    }

    return (

        <View style={listReviewTheme.listCard}>

            {reviewsResponse?.content.map(review =>

                <View key={review.id}>

                    <>

                        <View style={listReviewTheme.reviewImgContainer}>

                            <Image source={reviewStar} style={listReviewTheme.reviewImg} />

                            <Text style={listReviewTheme.reviewNameUser}>{review.user.name}</Text>

                            <Text style={listReviewTheme.reviewDate}>
                                Criado: {getCreatedDate(review?.createdAt.toString())}
                            </Text>

                        </View>

                        <View style={listReviewTheme.reviewContent}>

                            <Text style={text.synopsisDescription}>
                                {review.text}
                            </Text>

                        </View>

                    </>

                </View>
            )}

            <View style={listReviewTheme.reviewPagination}>
                <Text>Paginação</Text>
            </View>

        </View>
    );
}

export default ListReview;