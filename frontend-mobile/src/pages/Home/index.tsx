import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../Routes';

import { LOGIN } from '../../utils/RouteUrlName';

import drawHome from '../../assets/draw-home.png';
import arrow from '../../assets/arrow.png';

import { theme, text } from '../../styles';
import { homeTheme } from './styles';

type loginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Home: React.FC = () => {

    const navigation = useNavigation<loginScreenProp>();

    return (

        <View style={theme.appContainer}>

            <View style={homeTheme.homeCard}>

                <Image source={drawHome} style={homeTheme.homeDraw} />

                <View style={homeTheme.homeTextContainer}>

                    <Text style={text.bold}>Avalie filmes</Text>

                    <Text style={text.regular}>Diga o que você achou do seu filme favorito.</Text>

                </View>

                <TouchableOpacity
                    style={theme.primaryButton}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate(LOGIN)}
                >

                    <Text style={text.primaryText}>FAZER LOGIN</Text>

                    <View style={homeTheme.homeArrowContainer}>
                        <Image source={arrow} />
                    </View>

                </TouchableOpacity>

            </View>

        </View>
    );
}

export default Home;