import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { colors, theme } from '../../styles';

type Props = {
    msg: string;
}

const Loading: React.FC<Props> = ({ msg }) => {

    return (

        <View style={theme.loadingModalBackground}>
            <View style={theme.loadingActivityIndicator}>
                <ActivityIndicator size="large" color={colors.veryLightGray} />
                <Text style={theme.loadingText}>{msg}...</Text>
            </View>
        </View>
    );
}

export default Loading;