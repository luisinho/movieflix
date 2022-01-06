import { StyleSheet } from 'react-native';

import { colors } from '../../styles';

const loadingTheme = StyleSheet.create({

    modalBackground: {

        flex: 1,

        alignItems: 'center',

        flexDirection: 'column',

        justifyContent: 'space-around',
    },

    activityIndicator: {

        display: 'flex',

        width: 230,

        height: 100,

        borderRadius: 10,

        alignItems: 'center',

        justifyContent: 'space-around',

        backgroundColor: colors.white,
    },

    textMsg: {

        fontSize: 18,

        color: colors.mediumGray,
    },
});

export { loadingTheme };