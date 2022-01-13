import React, { useState, useCallback, useEffect } from 'react';
import { ScrollView, View, Text, SafeAreaView } from 'react-native';
import { AxiosError } from 'axios';

import { MovieCard, SearchCombo } from '../Catalog/component';
import { makePrivateRequest } from '../../services/request';
import { MoviesResponse } from '../../entities/Movie';
import Pagination from '../Pagination';

import { URL_MOVIES } from '../../utils/ApiUrl';
import { STATUS_200 } from '../../utils/HttpStatus';

import Loading from '../Loading';

import { theme } from '../../styles';
import { catalogTheme } from './styles';

const Catalog: React.FC = () => {

    const [moviesResponse, setMoviesResponse] = useState<MoviesResponse>();

    const [activePage, setActivePage] = useState(0);

    const [search, setSearch] = useState('0');

    const [isLoading, setIsLoading] = useState(false);

    const getMovies = useCallback(() => {

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

    }, [Number(search.toString()), activePage]);

    useEffect(() => {
        getMovies();
    }, [getMovies]);

    return (

        <View style={theme.appContainer}>

            <ScrollView contentContainerStyle={catalogTheme.scrollCatalogContainer}>

                <View style={catalogTheme.searchComboContainer}>

                    <SearchCombo genre="" search={search} setSearch={setSearch} />

                </View>

                {isLoading ? (
                    <Loading msg='Carregando o catalogo.' />
                ) :
                    (moviesResponse?.content.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    )))
                }

            </ScrollView>

            <View style={catalogTheme.pagination}>
                {moviesResponse && (
                    <Pagination
                        totalPages={moviesResponse?.totalPages}
                        activePage={activePage}
                        onChange={page => setActivePage(page)} />
                )}
            </View>

        </View>
    );
}

export default Catalog;