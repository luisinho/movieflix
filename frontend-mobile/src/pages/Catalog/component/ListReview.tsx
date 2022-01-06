import React, { useEffect, useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity } from 'react-native';

import reviewStar from '../../../assets/review-star.png';
import { text } from '../../../styles';
import { listReviewTheme } from '../styles';

const ListReview: React.FC = () => {

    return (

        <View style={listReviewTheme.listCard}>

            <View style={listReviewTheme.reviewImgContainer}>

                <Image source={reviewStar} style={listReviewTheme.reviewImg} />

                <Text style={listReviewTheme.reviewNameUser}>Maria Silva</Text>

                <Text style={listReviewTheme.reviewDate}>Criado: 03/12/2021 23:31:59</Text>

            </View>

            <View style={listReviewTheme.reviewContent}>

                <Text style={text.synopsisDescription}>
                    Gostei muito do filme. Foi muito bom mesmo. Pena que durou pouco.
                </Text>

            </View>

        </View>
    );
}

export default ListReview;