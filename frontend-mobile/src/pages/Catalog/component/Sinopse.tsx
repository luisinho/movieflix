import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { AxiosError } from 'axios';

import { Movie } from '../../../entities/Movie';
import { makePrivateRequest } from '../../../services/request';

import { URL_MOVIES } from '../../../utils/ApiUrl';
import { STATUS_200 } from '../../../utils/HttpStatus';

import Loading from '../../Loading';

import { text } from '../../../styles';
import { synopsisTheme } from '../styles';

type Props = {

    movieIdSinopse: number;
}

const Sinopse: React.FC<Props> = ({ movieIdSinopse }) => {

    const [movie, setMovie] = useState<Movie>();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        setIsLoading(true);

        makePrivateRequest({ url: `${URL_MOVIES}/${movieIdSinopse}` })
            .then(response => {

                if (response.status === STATUS_200) {

                    setMovie(response.data);
                }

            }).catch((err: AxiosError) => {

                console.log('Ocorreu um erro ao obter o detalhe do filme.', err);

            }).finally(() => {
                setIsLoading(false);
            });

    }, [movieIdSinopse]);

    return (

        <View style={synopsisTheme.synopsisCard}>

            {isLoading ? (
                <Loading msg='Carregando a Sinopse.' />
            ) :
                (<Image source={{ uri: movie?.imgUrl }} style={synopsisTheme.synopsisImg} />)
            }

            {!isLoading && (

                <View>

                    <Text style={text.movieTitle}>{movie?.title}</Text>

                    <View>

                        <Text style={text.movieYear}>{movie?.year}</Text>

                        <View>
                            <Text style={text.subTitle}>{movie?.subTitle}</Text>
                        </View>

                    </View>

                    <View style={[synopsisTheme.synopsisContent]}>
                        <Text style={text.synopsisDescription}>
                            {movie?.synopsis}
                        </Text>
                    </View>

                </View>)
            }

        </View>
    );
}

export default Sinopse;