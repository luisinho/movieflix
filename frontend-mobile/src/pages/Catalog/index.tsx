import React, { useState, useCallback, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { AxiosError } from 'axios';

import Loading from '../Loading';

import { MovieCard, SearchCombo } from '../Catalog/component';

import { makePrivateRequest } from '../../services/request';
import { MoviesResponse } from '../../entities/Movie';

import { URL_MOVIES } from '../../utils/ApiUrl';
import { STATUS_200 } from '../../utils/HttpStatus';

import { theme } from '../../styles';

const Catalog: React.FC = () => {

    const [moviesResponse, setMoviesResponse] = useState<MoviesResponse>();

    const [activePage, setActivePage] = useState(0);

    const [search, setSearch] = useState('0');

    const [isLoading, setIsLoading] = useState(false);

    const getMovies = useCallback(() => {

        const params = {
            genreId: Number(search.toString()),
            page: activePage,
            linesPerPage: 4
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

    }, [Number(search.toString())]);

    useEffect(() => {
        getMovies();
    }, [getMovies]);

    return (

        <View style={theme.catalogContainer}>

            <ScrollView contentContainerStyle={theme.scrollCatalogContainer}>

                <View style={theme.searchComboContainer}>

                    <SearchCombo genre="" search={search} setSearch={setSearch} />

                </View>

                {isLoading ? (
                    <Loading msg='Carregando o catalogo' />
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