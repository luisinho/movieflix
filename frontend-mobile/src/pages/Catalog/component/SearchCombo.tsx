import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { AxiosError } from 'axios';
import { Picker } from "@react-native-picker/picker";

import { makePrivateRequest } from '../../../services/request';
import { GenresResponse } from '../../../entities/Genre';

import { URL_GENRES } from '../../../utils/ApiUrl';
import { STATUS_200 } from '../../../utils/HttpStatus';

import { catalogTheme } from '../styles';

interface SearchProps {
    search: string;
    setSearch: Function;
    handleActivePage: Function;
}

const SearchCombo: React.FC<SearchProps> = ({ search, setSearch, handleActivePage }) => {

    const [genresResponse, setGenresResponse] = useState<GenresResponse>();

    useEffect(() => {

        makePrivateRequest({ url: URL_GENRES })
            .then(response => {

                if (response.status === STATUS_200) {
                    setGenresResponse({ content: response.data });
                }

            }).catch((err: AxiosError) => {
                console.log('Ocorreu um erro ao listar os generos:', err);
            }).finally(() => {
            });
    }, []);

    return (

        <View style={catalogTheme.searchCombo}>

            <Picker
                selectedValue={search}
                onValueChange={(value, index) => { setSearch(value), handleActivePage() }}
                mode="dropdown" // Android only
            >
                <Picker.Item style={catalogTheme.itemPicker} label="Selecione o genero" value="0" />

                {
                    genresResponse?.content.map((genre) => (
                        <Picker.Item style={catalogTheme.itemPicker} key={genre.id} label={genre.name} value={genre.id} />

                    ))
                }

            </Picker>

        </View>
    );
}

export default SearchCombo;