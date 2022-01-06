import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AxiosError } from 'axios';

import { theme, text } from '../../../styles';
import { reviewTheme } from '../styles';

const ReviewForm: React.FC = () => {

    return (

        <View style={reviewTheme.reviewCard}>

            <TextInput
                multiline
                placeholder="Deixe sua avaliação aqui"
                style={reviewTheme.reviewTextInput}
            />

            <TouchableOpacity
                style={[theme.primaryButton, reviewTheme.widthTouchable]}
                activeOpacity={0.8}>

                <Text style={[text.primaryText, reviewTheme.textMarginTouchable]}>SALVAR AVALIAÇÃO</Text>

            </TouchableOpacity>

        </View>
    );
}

export default ReviewForm;