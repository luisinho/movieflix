import React from 'react';
import { View, Text, ImageSourcePropType, TouchableOpacity, Image } from 'react-native';

import { theme, text } from '../../../styles';

interface MovieProps {
    id: Number;
    imgUrl: ImageSourcePropType;
    title: String;
    year: Number;
    subTitle: String;
}

const MovieCard: React.FC<MovieProps> = ({ id, imgUrl, title, year, subTitle }) => {

    return (

        <View style={theme.movieContainer}>

            <TouchableOpacity style={theme.movieCard}>

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



        </View>
    );
}

export default MovieCard;