import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

import movieImg from '../../../assets/img-teste.jpg';
import { theme, text } from '../../../styles';

const Sinopse = () => {

    return (

        <ScrollView style={theme.synopsisCard}>

            <Image source={movieImg} style={theme.synopsisImg} />

            <View>

                <Text style={text.movieTitle}>O Retorno do Rei</Text>

                <View>

                    <Text style={text.movieYear}>2013</Text>

                    <View>
                        <Text style={text.subTitle}>O olho do inimigo está se movendo.</Text>
                    </View>

                </View>

                <ScrollView style={[theme.synopsisContent, text.synopsisMargin]}>
                    <Text style={text.synopsisDescription}>
                        O confronto final entre as forças do bem e do mal que lutam pelo controle do futuro da Terra Média se aproxima. Sauron planeja um grande ataque a Minas Tirith, capital de Gondor, o que faz com que Gandalf e Pippin partam para o local na intenção de ajudar a resistência. Um exército é reunido por Theoden em Rohan, em mais uma tentativa de deter as forças de Sauron. Enquanto isso, Frodo, Sam e Gollum seguem sua viagem rumo à Montanha da Perdição para destruir o anel.
                    </Text>
                </ScrollView>

            </View>

        </ScrollView>


    );
}

export default Sinopse;