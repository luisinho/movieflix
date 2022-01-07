import React from 'react';
import { View, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

import Sinopse from './Sinopse';
import ReviewForm from './ReviewForm';
import ListReview from './ListReview';

import { theme } from '../../../styles';

const MovieDetails: React.FC = () => {

    const route = useRoute();

    const params = route.params;

    const objJson = JSON.stringify(params);

    const { movieId } = JSON.parse(objJson);

    return (
        <View style={theme.appContainer}>
            <ScrollView>
                <Sinopse movieIdSinopse={movieId} />
                <ReviewForm movieIdReviewForm={movieId} />
                <ListReview movieIdReview={movieId} />
            </ScrollView>
        </View>
    );
}

export default MovieDetails;