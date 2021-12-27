import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { MovieCard, SearchCombo } from '../Catalog/component';
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

    const [search, setSearch] = useState('0');

    const data = search !== '0' ?
        movies.filter(movie => movie.id === Number(search.toString())) : movies;

    return (

        <View style={theme.catalogContainer}>

            <ScrollView contentContainerStyle={theme.scrollCatalogContainer}>

                <View style={theme.searchComboContainer}>

                    <SearchCombo genre="" search={search} setSearch={setSearch} />

                </View>

                {
                    data.map((movie) => (
                        <MovieCard key={movie.id} {...movie} />
                    ))
                }

            </ScrollView>

        </View>
    );
}

export default Catalog;