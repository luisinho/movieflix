import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AxiosError } from 'axios';
import Toast from 'react-native-tiny-toast';

import { URL_REVIEWS } from '../../../utils/ApiUrl';
import { POST } from '../../../utils/ApiMethod';
import { getLoggedUser } from '../../../services/auth';
import { STATUS_201 } from '../../../utils/HttpStatus';
import { makePrivateRequest } from '../../../services/request';
import { Review, getNewReview } from '../../../entities/Review';

import Loading from '../../Loading';

import { reviewTheme } from '../styles';
import { theme, text } from '../../../styles';

type Props = {
    movieIdReviewForm: number;
    setIdNewReview: Function;
}

type FormData = {
    text?: string;
}

const ReviewForm: React.FC<Props> = ({ movieIdReviewForm, setIdNewReview }) => {

    const [userId, setUserId] = useState<number>(0);

    const [formData, setFormData] = useState<FormData>();

    const [isLoading, setIsLoading] = useState(false);

    const [hasFieldError, setHasFieldError] = useState(false);

    const [msgFieldError, setMsgFieldError] = useState('');

    useEffect(() => {

        getLoggedUser().then(loggedUserId => {

            setUserId(loggedUserId);
        });

    }, [movieIdReviewForm]);

    const onChangeTextReview = (text: string) => {

        const newFormData = { ...formData };

        newFormData.text = text;

        setFormData(newFormData);
    }

    const handleSaveReview = async () => {

        const review: Review = getNewReview();

        review.text = String(formData?.text);

        review.movie.id = movieIdReviewForm;

        review.user.id = userId;

        const isValidate: Boolean = validateField(review.text);

        if (isValidate) {

            setIsLoading(true);

            makePrivateRequest({ method: POST, url: URL_REVIEWS, data: review })
                .then(response => {

                    if (response.status === STATUS_201) {

                        setIdNewReview(response.data.id);

                        Toast.showSuccess('Avaliação salva com sucesso.', {
                            containerStyle: theme.toastContainer,
                            textStyle: text.toastText
                        });
                    }

                }).catch((err: AxiosError) => {

                    console.log('Ocorreu um erro ao salvar a avaliação: ', err);

                    Toast.show('Ocorreu um erro ao salvar a avaliação', {
                        containerStyle: theme.toastContainer,
                        textStyle: text.toastTextError
                    });

                }).finally(() => {
                    setIsLoading(false);
                    setHasFieldError(false);
                    setMsgFieldError('');
                    setFormData({ text: '' });
                });
        }
    }

    const validateField = (text: string): Boolean => {

        let result: boolean = true;

        if (text === undefined
            || text === 'undefined'
            || text === null
            || text === '') {

            result = false;

            setHasFieldError(true);

            setMsgFieldError('Campo avaliação é obrigatório!');

            return result;
        }

        if (text.length === 0) {

            result = false;

            setHasFieldError(true);

            setMsgFieldError('Campo avaliação é obrigatório!');

            return result;
        }

        if (text.length < 3) {

            result = false;

            setHasFieldError(true);

            setMsgFieldError('Campo avaliação deve conter no minimo 3 caracteres!');

            return result;
        }

        return result;
    };

    return (

        <View>

            <View style={reviewTheme.reviewCard}>

                <TextInput
                    multiline
                    value={formData?.text}
                    placeholder="Deixe sua avaliação aqui."
                    style={reviewTheme.textInput}
                    onChangeText={(event) => onChangeTextReview(event)}
                />

                {hasFieldError && (

                    <View style={reviewTheme.textInputError}>
                        <Text style={text.fieldsErrors}>{msgFieldError}</Text>
                    </View>

                )}

                {isLoading ? (

                    <Loading msg='Salvando a avaliação.' />

                ) : (
                        <TouchableOpacity
                            style={[theme.primaryButton, reviewTheme.widthTouchable]}
                            activeOpacity={0.9} onPress={() => handleSaveReview()} >

                            <Text style={[text.primaryText, reviewTheme.textMarginTouchable]}>SALVAR AVALIAÇÃO</Text>

                        </TouchableOpacity>
                    )
                }

            </View>

        </View>

    );
}

export default ReviewForm;