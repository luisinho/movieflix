import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../../Routes';
import { nav } from '../../../styles';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HeaderButton: React.FC = () => {

    const navigation = useNavigation<homeScreenProp>();

    const home = 'Home';

    return (

        <TouchableOpacity style={nav.headerButton} onPress={() => navigation.navigate(home)}>
            <Text style={nav.rightText}>Sair</Text>
        </TouchableOpacity>

    );
}

export default HeaderButton;