import { StyleSheet } from 'react-native';

import { colors } from '../../styles';

const homeTheme = StyleSheet.create({

    homeCard: {

        width: "90%",

        height: "90%",

        borderRadius: 20,

        shadowOpacity: 0.25,

        shadowRadius: 3.84,

        shadowColor: colors.black,

        shadowOffset: {

            width: 0,

            height: 2,
        },

        alignItems: "center",

        justifyContent: "space-around",

        backgroundColor: colors.lighGray,
    },

    homeDraw: {

        width: 313,

        height: 225,
    },

    homeTextContainer: {

        paddingHorizontal: 20,
    },

    homeArrowContainer: {

        width: 50,

        height: 50,

        borderTopRightRadius: 10,

        borderBottomRightRadius: 10,

        alignItems: "center",

        justifyContent: "center",

        backgroundColor: colors.lighYellow,
    },
});

export { homeTheme };