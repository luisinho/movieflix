import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../../Routes';
import { Movie } from '../../../entities/Movie';

import { MOVIE_DETAILS } from '../../../utils/RouteUrlName';

import { text } from '../../../styles';
import { movieTheme } from '../styles';

type Props = {
    movie: Movie;
}

type movieDetailScreenProp = StackNavigationProp<RootStackParamList, 'MovieDetails'>;

const MovieCard: React.FC<Props> = ({ movie }) => {

    const navigation = useNavigation<movieDetailScreenProp>();

    return (

        <TouchableOpacity style={movieTheme.movieCard} onPress={() => navigation.navigate(MOVIE_DETAILS, { movieId: movie.id })}>

            <Image source={{ uri: movie.imgUrl }} style={movieTheme.movieImgCatalog} />

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