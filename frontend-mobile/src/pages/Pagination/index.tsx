import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { generateList } from '../../utils/list';

import arrow from '../../assets/arrow.png';
import { theme } from './styles';

type Props = {
    totalPages: number;
    activePage: number;
    onChange: (item: number) => void;
}

const Pagination: React.FC<Props> = ({ totalPages, activePage, onChange }) => {

    const items = generateList(totalPages);

    const previous = totalPages > 0 && activePage > 0 ? true : false;

    const nextClass = (activePage + 1) < totalPages ? true : false;

    return (

        <View style={theme.paginationContainer}>

            <TouchableOpacity
                onPress={() => onChange(activePage - 1)}
                activeOpacity={0.8}
                disabled={!previous} >

                <Image source={arrow}
                    style={[theme.paginationPrevious,
                    previous ? theme.pageActive : theme.pageInactive]} />

            </TouchableOpacity>

            {
                items.map(item => (

                    <TouchableOpacity
                        key={item}
                        activeOpacity={0.8}
                        onPress={() => onChange(item)} >

                        <Text style={[theme.paginationItem,
                        item === activePage ?
                            theme.colorYellow :
                            theme.colorGray]}>
                            {item + 1}
                        </Text>

                    </TouchableOpacity>
                ))
            }

            <TouchableOpacity
                onPress={() => onChange(activePage + 1)}
                activeOpacity={0.8}
                disabled={!nextClass}>

                <Image source={arrow}
                    style={[theme.paginationNext,
                    nextClass ? theme.pageActive : theme.pageInactive]} />

            </TouchableOpacity>

        </View>
    );
}

export default Pagination;