import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home, Catalog } from '../pages/';
import { MovieDetails } from '../pages/Catalog/component';

export type RootStackParamList = {
    Home: undefined;
    Catalog: undefined;
    MovieDetails: { movieId: Number };
};

const Stack = createNativeStackNavigator();

const Routes: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Catalog" component={Catalog} />
            <Stack.Screen name="MovieDetails" component={MovieDetails} />
        </Stack.Navigator>

    );
}

export default Routes;