import React, { useState, useCallback, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { AxiosError } from 'axios';
import Toast from 'react-native-tiny-toast';

import { MovieCard, SearchCombo } from '../Catalog/component';
import { makePrivateRequest } from '../../services/request';
import { MoviesResponse } from '../../entities/Movie';
import Pagination from '../Pagination';

import { URL_MOVIES } from '../../utils/ApiUrl';
import { STATUS_200 } from '../../utils/HttpStatus';

import Loading from '../Loading';

import { text, theme } from '../../styles';
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

                Toast.show('Ocorreu um erro ao listar os filmes', {
                    containerStyle: theme.toastContainer,
                    textStyle: text.toastTextError
                });

            }).finally(() => {
                setIsLoading(false);
            });

    }, [Number(search.toString()), activePage]);

    useEffect(() => {
        getMovies();
    }, [getMovies]);

    const handleActivePage = () => {

        setActivePage(0);
    }

    return (

        <View style={theme.appContainer}>

            <ScrollView contentContainerStyle={catalogTheme.scrollCatalogContainer}>

                <View style={catalogTheme.searchComboContainer}>

                    <SearchCombo search={search} setSearch={setSearch} handleActivePage={handleActivePage} />

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