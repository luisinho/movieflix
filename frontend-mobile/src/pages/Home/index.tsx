import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import drawHome from '../../assets/draw-home.png';
import { theme } from '../../styles';

const Home: React.FC = () => {

    return (

        <View style={theme.container}>

            <View style={theme.card}>
                <Image source={drawHome} style={theme.draw} />
            </View>

        </View>
    );
}

export default Home;