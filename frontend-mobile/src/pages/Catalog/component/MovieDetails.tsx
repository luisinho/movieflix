import React from 'react';
import { View, Text, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { theme } from '../../../styles';

const MovieDetails = () => {

    const route = useRoute();

    return (
        <View style={theme.movieDetailsContainer}>
            <Text>Details</Text>
        </View>
    );

}

export default MovieDetails;