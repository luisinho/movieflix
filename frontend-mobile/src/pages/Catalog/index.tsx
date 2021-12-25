import React from 'react';
import { ScrollView, Text } from 'react-native';

import { MovieCard } from '../Catalog/component';
import movieImg from '../../assets/img-teste.jpg';

import { theme } from '../../styles';

const movies = [
    {
        id: 1,
        imgUrl: movieImg,
        title: 'O Retorno do Rei 1',
        year: 2021,
        subTitle: 'O olho do inimigo está se movendo.'
    },

    {
        id: 2,
        imgUrl: movieImg,
        title: 'O Retorno do Rei 2',
        year: 2021,
        subTitle: 'O olho do inimigo está se movendo.'
    },

    {
        id: 3,
        imgUrl: movieImg,
        title: 'O Retorno do Rei 3',
        year: 2021,
        subTitle: 'O olho do inimigo está se movendo.'
    },

    {
        id: 4,
        imgUrl: movieImg,
        title: 'O Retorno do Rei 4',
        year: 2021,
        subTitle: 'O olho do inimigo está se movendo.'
    },

    {
        id: 5,
        imgUrl: movieImg,
        title: 'O Retorno do Rei 5',
        year: 2021,
        subTitle: 'O olho do inimigo está se movendo.'
    },
]
const Catalog: React.FC = () => {

    return (

        <ScrollView contentContainerStyle={theme.scrollCatalogContainer}>
            {
                movies.map((movie) => (
                    <MovieCard key={movie.id} {...movie} />
                ))
            }
        </ScrollView>
    );
}

export default Catalog;