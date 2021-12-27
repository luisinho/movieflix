import React, { useState } from 'react';
import { View } from 'react-native';
import { Picker } from "@react-native-picker/picker";

import { theme, text } from '../../../styles';

interface SearchProps {
    search: string;
    setSearch: Function;
    genre: string;
}

const SearchCombo: React.FC<SearchProps> = ({ search, setSearch, genre }) => {

    const data = [
        { text: 'O Retorno do Rei 1', value: 1 },
        { text: 'O Retorno do Rei 2', value: 2 },
        { text: 'O Retorno do Rei 3', value: 3 },
    ];

    return (

        <View style={theme.searchCombo}>

            <Picker
                selectedValue={search}
                onValueChange={(value, index) => setSearch(value)}
                mode="dropdown" // Android only
            >
                <Picker.Item style={theme.itemPicker} label="Selecione o genero" value="0" />

                {
                    data.map((genre) => (
                        <Picker.Item style={theme.itemPicker} key={genre.value} label={genre.text} value={genre.value} />

                    ))
                }

            </Picker>

        </View>
    );
}

export default SearchCombo;