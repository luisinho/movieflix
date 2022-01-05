import React from 'react';
import { View, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

import Sinopse from './Sinopse';
import ReviewForm from './ReviewForm';

import { theme } from '../../../styles';

const MovieDetails = () => {

    const route = useRoute();

    const params = route.params;

    const objJson = JSON.stringify(params);

    const { movieId } = JSON.parse(objJson);

    return (
        <View>
            <ScrollView style={theme.movieDetailsContainer}>
                <Sinopse movieId={movieId} />
                <ReviewForm />
            </ScrollView>
        </View>
    );
}

export default MovieDetails;