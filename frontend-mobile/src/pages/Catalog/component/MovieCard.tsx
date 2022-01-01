import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Movie } from '../../../entities/Movie';
import { RootStackParamList } from '../../../Routes';

import { theme, text } from '../../../styles';

type Props = {
    movie: Movie;
}

type movieDetailScreenProp = StackNavigationProp<RootStackParamList, 'MovieDetails'>;

const MovieCard: React.FC<Props> = ({ movie }) => {

    const navigation = useNavigation<movieDetailScreenProp>();

    const movieDetails = 'MovieDetails';

    return (

        <TouchableOpacity style={theme.movieCard} onPress={() => navigation.navigate(movieDetails, { movieId: movie.id })}>

            <Image source={{ uri: movie.imgUrl }} style={theme.imgCatalog} />

            <View>

                <Text style={text.movieTitle}>{movie.title}</Text>

                <View>

                    <Text style={text.movieYear}>{movie.year}</Text>

                    <View>
                        <Text style={[text.subTitle, text.movieMargin]}>{movie.subTitle}</Text>
                    </View>

                </View>

            </View>

        </TouchableOpacity>

    );
}

export default MovieCard;