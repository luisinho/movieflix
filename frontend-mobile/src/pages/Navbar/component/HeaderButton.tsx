import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../../Routes';

import { HOME } from '../../../utils/RouteUrlName';

import { getAccessTokenDecoded, logoutItem } from '../../../services/auth';
import { nav } from '../../../styles';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HeaderButton: React.FC = () => {

    const [currentUser, setCurrentUser] = useState<string>('');

    const navigation = useNavigation<homeScreenProp>();

    useEffect(() => {

        const currentUserData = getAccessTokenDecoded();

        currentUserData.then(response => {
            setCurrentUser(response.user_name);
        });

    }, [currentUser]);

    const handleLogout = () => {
        logoutItem();
        navigation.navigate(HOME);
    }

    return (

        <View>

            { currentUser ? (

                <TouchableOpacity style={nav.headerButton} onPress={() => handleLogout()}>
                    <Text style={nav.rightText}>Sair</Text>
                </TouchableOpacity>) : <View />
            }

        </View>

    );
}

export default HeaderButton;