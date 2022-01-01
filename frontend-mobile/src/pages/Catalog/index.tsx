import React, { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { AxiosError } from 'axios';

import { MovieCard, SearchCombo } from '../Catalog/component';

import { makePrivateRequest } from '../../services/request';
import { MoviesResponse } from '../../entities/Movie';

import { URL_MOVIES } from '../../utils/ApiUrl';
import { STATUS_200 } from '../../utils/HttpStatus';

import { colors, theme } from '../../styles';

const Catalog: React.FC = () => {

    const [moviesResponse, setMoviesResponse] = useState<MoviesResponse>();

    const [activePage, setActivePage] = useState(0);

    const [search, setSearch] = useState('0');

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const params = {
            genreId: Number(search.toString()),
            page: activePage,
            linesPerPage: 10
        }

        setIsLoading(true);

        makePrivateRequest({ url: URL_MOVIES, params: params })
            .then(response => {

                if (response.status === STATUS_200) {
                    setMoviesResponse(response.data);
                }

            }).catch((err: AxiosError) => {

                console.log('Ocorreu um erro ao listar os filmes', err);

            }).finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (

        <View style={theme.catalogContainer}>

            <ScrollView contentContainerStyle={theme.scrollCatalogContainer}>

                <View style={theme.searchComboContainer}>

                    <SearchCombo genre="" search={search} setSearch={setSearch} />

                </View>

                {isLoading ? (
                    <View style={theme.modalLoadingBackground}>
                        <View style={theme.activityIndicatorLoading}>
                            <ActivityIndicator size="large" color={colors.veryLightGray} />
                            <Text>Carregando...</Text>
                        </View>
                    </View>
                ) :
                    (moviesResponse?.content.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    )))
                }

            </ScrollView>

        </View>
    );
}

export default Catalog;