import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

import Sinopse from './Sinopse';
import ReviewForm from './ReviewForm';
import ListReview from './ListReview';
import { getAccessTokenDecoded, isAllowedByRole } from '../../../services/auth';

import { theme } from '../../../styles';

const MovieDetails: React.FC = () => {

    const route = useRoute();

    const params = route.params;

    const objJson = JSON.stringify(params);

    const { movieId } = JSON.parse(objJson);

    const [idNewReview, setIdNewReview] = useState<number>(0);

    const [authorities, setAuthorities] = useState<any[]>();

    useEffect(() => {

        getAccessTokenDecoded().then(roles => {

            setAuthorities(roles.authorities);

        });

    }, []);

    return (

        <View style={theme.appContainer}>

            <ScrollView>

                <Sinopse movieIdSinopse={movieId} />

                {authorities && isAllowedByRole(authorities) && (
                    <ReviewForm movieIdReviewForm={movieId} setIdNewReview={setIdNewReview} />
                )}

                <ListReview movieIdReview={movieId} newQuantityReview={idNewReview} />

            </ScrollView>

        </View>
    );
}

export default MovieDetails;