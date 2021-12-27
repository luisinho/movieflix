import React from 'react';
import { View, Text, ImageSourcePropType, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { theme, text } from '../../../styles';
import { RootStackParamList } from '../../../Routes';

interface MovieProps {
    id: Number;
    imgUrl: ImageSourcePropType;
    title: String;
    year: Number;
    subTitle: String;
}

type movieDetailScreenProp = StackNavigationProp<RootStackParamList, 'MovieDetails'>;

const MovieCard: React.FC<MovieProps> = ({ id, imgUrl, title, year, subTitle }) => {

    const navigation = useNavigation<movieDetailScreenProp>();

    const movieDetails = 'MovieDetails';

    return (

        <TouchableOpacity style={theme.movieCard} onPress={() => navigation.navigate(movieDetails, { movieId: id })}>

            <Image source={imgUrl} style={theme.imgCatalog} />

            <View>

                <Text style={text.movieTitle}>{title}</Text>

                <View>

                    <Text style={text.movieYear}>{year}</Text>

                    <View>
                        <Text style={text.movieSubTitle}>{subTitle}</Text>
                    </View>

                </View>

            </View>

        </TouchableOpacity>

    );
}

export default MovieCard;