import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Catalog, Home, Login } from '../pages/';
import { MovieDetails } from '../pages/Catalog/component';
import { HeaderText, HeaderButton } from '../pages/Navbar/component';

import { HOME, CATALOG, LOGIN, MOVIE_DETAILS } from '../utils/RouteUrlName';

import { colors } from '../styles';

export type RootStackParamList = {
    Catalog: undefined;
    Home: undefined;
    Login: undefined;
    MovieDetails: { movieId: Number };
};

const Stack = createNativeStackNavigator();

const Routes: React.FC = () => {
    return (
        <Stack.Navigator
            initialRouteName={HOME}
            screenOptions={{
                title: '',
                headerStyle: {
                    backgroundColor: colors.mediumYellow,
                },
                headerLeft: () => <HeaderText />,
                headerRight: () => <HeaderButton />
            }}
        >
            <Stack.Screen name={CATALOG} component={Catalog} />
            <Stack.Screen name={HOME} component={Home} />
            <Stack.Screen name={LOGIN} component={Login} />
            <Stack.Screen name={MOVIE_DETAILS} component={MovieDetails} />
        </Stack.Navigator>

    );
}

export default Routes;