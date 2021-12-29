import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Catalog, Home, Login } from '../pages/';
import { MovieDetails } from '../pages/Catalog/component';
import { HeaderText, HeaderButton } from '../pages/Navbar/component';

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
            initialRouteName="Home"
            screenOptions={{
                title: '',
                headerStyle: {
                    backgroundColor: colors.mediumYellow,
                },
                headerLeft: () => <HeaderText />,
                headerRight: () => <HeaderButton />
            }}
        >
            <Stack.Screen name="Catalog" component={Catalog} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="MovieDetails" component={MovieDetails} />
        </Stack.Navigator>

    );
}

export default Routes;