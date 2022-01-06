import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { colors } from '../../styles';
import { loadingTheme } from './styles';

type Props = {
    msg: string;
}

const Loading: React.FC<Props> = ({ msg }) => {

    return (

        <View style={loadingTheme.modalBackground}>

            <View style={loadingTheme.activityIndicator}>

                <ActivityIndicator size="large" color={colors.veryLightGray} />

                <Text style={loadingTheme.textMsg}>{msg}...</Text>

            </View>

        </View>
    );
}

export default Loading;