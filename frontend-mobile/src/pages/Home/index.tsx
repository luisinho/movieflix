import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import drawHome from '../../assets/draw-home.png';
import arrow from '../../assets/arrow.png';
import { theme, text } from '../../styles';

const Home: React.FC = () => {

    const navigation = useNavigation();

    const catalog = 'Catalog';

    return (

        <View style={theme.container}>

            <View style={theme.card}>

                <Image source={drawHome} style={theme.draw} />

                <View style={theme.textContainer}>

                    <Text style={text.bold}>Avalie filmes</Text>

                    <Text style={text.regular}>Diga o que você achou do seu filme favorito.</Text>

                </View>

                <TouchableOpacity
                    style={theme.primaryButton}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate(catalog as never, {} as never)}
                >

                    <Text style={text.primaryText}>FAZER LOGIN</Text>

                    <View style={theme.arrowContainer}>
                        <Image source={arrow} />
                    </View>

                </TouchableOpacity>

            </View>

        </View>
    );
}

export default Home;