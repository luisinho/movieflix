import React from 'react';
import { View, Text, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { theme } from '../../../styles';
import Sinopse from './Sinopse';

const MovieDetails = () => {

    const route = useRoute();

    return (
        <View style={theme.movieDetailsContainer}>
            <Sinopse />
        </View>
    );

}

export default MovieDetails;