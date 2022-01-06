import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { AxiosError } from 'axios';

import { makePrivateRequest } from '../../../services/request';

import { Movie } from '../../../entities/Movie';

import { URL_MOVIES } from '../../../utils/ApiUrl';
import { STATUS_200 } from '../../../utils/HttpStatus';

import { text } from '../../../styles';
import { synopsisTheme } from '../styles';

type Props = {

    movieId: number;
}

const Sinopse: React.FC<Props> = ({ movieId }) => {

    const [movie, setMovie] = useState<Movie>();

    useEffect(() => {

        makePrivateRequest({ url: `${URL_MOVIES}/${movieId}` })
            .then(response => {

                if (response.status === STATUS_200) {

                    setMovie(response.data);
                }

            }).catch((err: AxiosError) => {

                console.log('Ocorreu um erro ao obter o detalhe do filme.', err);

            }).finally(() => {
            });

    }, [movieId]);

    return (

        <View style={synopsisTheme.synopsisCard}>

            <Image source={{ uri: movie?.imgUrl }} style={synopsisTheme.synopsisImg} />

            <View>

                <Text style={text.movieTitle}>{movie?.title}</Text>

                <View>

                    <Text style={text.movieYear}>{movie?.year}</Text>

                    <View>
                        <Text style={text.subTitle}>{movie?.subTitle}</Text>
                    </View>

                </View>

                <ScrollView style={[synopsisTheme.synopsisContent, synopsisTheme.synopsisMargin]}>
                    <Text style={text.synopsisDescription}>
                        {movie?.synopsis}
                    </Text>
                </ScrollView>

            </View>

        </View>
    );
}

export default Sinopse;