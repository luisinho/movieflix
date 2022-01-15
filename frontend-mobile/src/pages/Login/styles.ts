import { StyleSheet } from 'react-native';

import { colors } from '../../styles';

const loginTheme = StyleSheet.create({

    loginCard: {

        width: 335,

        height: 590,

        borderRadius: 10,

        alignItems: "center",

        backgroundColor: colors.lighGray,
    },

    loginLoading: {

        marginTop: 25,
    },

    loginMsgErro: {

        width: "100%",

        marginTop: 25,

        alignContent: "center",

        alignItems: "center",
    },

    loginMsgErroText: {

        fontSize: 18,

        lineHeight: 35,

        fontWeight: "bold",

        backgroundColor: "#fff4cc",
    },

    loginTitle: {

        width: 176,

        height: 68,

        fontSize: 36,

        marginTop: 80,

        marginBottom: 25,

        lineHeight: 50,

        letterSpacing: -0.015,

        fontWeight: "normal",

        textAlign: "center",

        textTransform: "uppercase",

        color: colors.white,
    },

    loginTextInput: {

        width: 285,

        height: 45,

        // marginBottom: 10,

        padding: 10,

        borderWidth: 1,

        borderRadius: 10,

        borderColor: "#E1E1E1",

        borderStyle: "solid",

        backgroundColor: "#FEFEFE",
    },

    textInputEmailError: {

        width: 280,

        height: 25,

        padding: 5,

        marginTop: 5,

        marginBottom: 10,

        borderRadius: 10,

        marginLeft: "auto",

        marginRight: "auto",

        alignItems: "center",

        alignContent: "center",

        backgroundColor: colors.white,
    },

    loginPasswordGroup: {

        marginTop: 15,

        flexDirection: "row",

        alignItems: "stretch",
    },

    loginToggle: {

        marginTop: 10,

        marginLeft: -30,
    },

    loginImgEyes: {

        width: 25,

        height: 25,
    },

    loginButton: {

        width: 250,

        height: 50,

        borderRadius: 10,

        padding: 10,

        marginTop: 50,

        marginLeft: "auto",

        marginRight: "auto",

        justifyContent: "center",

        backgroundColor: colors.mediumYellow,
    },
});

export { loginTheme };