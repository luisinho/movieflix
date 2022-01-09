import { StyleSheet } from 'react-native';

const colors = {

    white: "#FFFFFF",

    black: "#000000",

    mediumYellow: "#FFC700",

    lighYellow: "#937d22",

    lighGray: "#6C6C6C",

    mediumGray: "#525252",

    veryLightGray: "#9E9E9E",

    redMsgError: "#dc3545",
};

const text = StyleSheet.create({

    regular: {

        fontSize: 18,

        fontWeight: "400",

        textAlign: "center",

        color: colors.white,
    },

    bold: {

        fontSize: 26,

        marginBottom: 25,

        fontWeight: "bold",

        textAlign: "center",

        color: colors.white,
    },

    primaryText: {

        fontSize: 16,

        marginLeft: 55,

        fontWeight: "bold",

        textTransform: "uppercase",

        color: colors.black,
    },

    movieTitle: {

        fontSize: 20,

        fontWeight: "bold",

        lineHeight: 27,

        marginTop: 12,

        marginLeft: 16,

        color: colors.white,
    },

    movieYear: {

        fontSize: 16,

        fontWeight: "bold",

        lineHeight: 22,

        marginLeft: 16,

        color: colors.mediumYellow,
    },

    subTitle: {

        fontSize: 14,

        fontWeight: "normal",

        lineHeight: 19,

        marginLeft: 16,

        color: colors.white,
    },

    movieMargin: {

        marginBottom: 50,
    },

    synopsisDescription: {

        fontSize: 16,

        lineHeight: 22,

        fontStyle: "normal",

        fontWeight: "normal",

        textAlign: "justify",

        color: colors.veryLightGray,
    },

    fieldsErrors: {

        fontSize: 12,

        fontWeight: "bold",

        color: colors.redMsgError,
    }
});

const theme = StyleSheet.create({

    appContainer: {

        flex: 1,

        width: "100%",

        justifyContent: "center",

        alignItems: "center",

        backgroundColor: colors.mediumGray,
    },

    primaryButton: {

        width: 250,

        height: 50,

        borderRadius: 10,

        flexDirection: "row",

        justifyContent: "space-between",

        alignItems: "center",

        backgroundColor: colors.mediumYellow,
    },
});

const nav = StyleSheet.create({

    leftText: {

        width: 112,

        height: 33,

        fontSize: 22,

        fontWeight: "bold",

        letterSpacing: -0.015,

        marginLeft: 5,

        color: colors.black,
    },

    headerButton: {

        width: 100,

        height: 30,

        borderWidth: 1.3,

        borderRadius: 12,

        alignItems: "center",

        justifyContent: "center",
    },

    rightText: {

        width: 85,

        height: 22,

        fontSize: 14,

        fontWeight: "bold",

        lineHeight: 19,

        textTransform: "uppercase",

        color: colors.black,

        textAlign: "center",
    }
});

export { colors, nav, text, theme };