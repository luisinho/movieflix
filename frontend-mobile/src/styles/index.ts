import { StyleSheet } from 'react-native';

const colors = {

    white: "#FFFFFF",

    black: "#000000",

    mediumYellow: "#FFC700",

    lighYellow: "#937d22",

    lighGray: "#6C6C6C",

    mediumGray: "#525252",

    veryLightGray: "#9E9E9E",
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

        fontWeight: "bold",

        textAlign: "center",

        color: colors.white,

        marginBottom: 25,
    },

    primaryText: {

        fontSize: 16,

        fontWeight: "bold",

        textTransform: "uppercase",

        color: colors.black,

        marginLeft: 55,
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

        fontStyle: "normal",

        fontWeight: "normal",

        fontSize: 16,

        lineHeight: 22,

        textAlign: "justify",

        color: colors.veryLightGray,
    },

    synopsisMargin: {

        marginTop: 20,
    },
});

const theme = StyleSheet.create({

    container: {

        flex: 1,

        justifyContent: "center",

        alignItems: "center",

        padding: 20,

        // color: colors.mediumGray,
    },

    card: {

        width: "100%",

        height: "100%",

        backgroundColor: colors.lighGray,

        borderRadius: 20,

        shadowColor: colors.black,

        shadowOffset: {

            width: 0,

            height: 2,
        },

        shadowOpacity: 0.25,

        shadowRadius: 3.84,

        alignItems: "center",

        justifyContent: "space-around",
    },

    draw: {
        width: 313,
        height: 225,
    },

    textContainer: {

        paddingHorizontal: 20,
    },

    primaryButton: {

        width: 250,

        height: 50,

        backgroundColor: colors.mediumYellow,

        borderRadius: 10,

        flexDirection: "row",

        justifyContent: "space-between",

        alignItems: "center"
    },

    arrowContainer: {

        width: 50,

        height: 50,

        backgroundColor: colors.lighYellow,

        borderTopRightRadius: 10,

        borderBottomRightRadius: 10,

        alignItems: "center",

        justifyContent: "center",
    },

    // Catalog Movie Card
    scrollCatalogContainer: {

        padding: 0,
    },

    catalogContainer: {

        flex: 1,

        justifyContent: "center",

        alignItems: "center",

        backgroundColor: colors.mediumGray,
    },

    movieCard: {

        width: 300,

        backgroundColor: colors.lighGray,

        borderRadius: 10,

        shadowRadius: 3.84,

        marginBottom: 20,
    },

    imgCatalog: {
        marginTop: 26,
        width: 300,
        height: 164,
    },

    // Search Combo
    searchComboContainer: {

        width: 300,

        height: 80,

        marginTop: 20,

        marginBottom: 20,

        borderRadius: 10,

        flex: 1,

        justifyContent: "center",

        alignItems: "center",

        backgroundColor: colors.lighGray,

    },

    searchCombo: {

        width: 275,

        flex: 1,

        justifyContent: "center",

        marginTop: 5,

        marginBottom: 5,

        borderWidth: 0.9,

        borderRadius: 10,

        borderColor: colors.white,
    },

    itemPicker: {

        color: colors.white,

        backgroundColor: colors.lighGray,
    },

    // Movie Details
    movieDetailsContainer: {

        justifyContent: "center",

        alignItems: "center",

        backgroundColor: colors.mediumGray,
    },

    // Sinopse
    synopsisCard: {

        width: 340,

        height: "auto",

        backgroundColor: colors.lighGray,

        borderRadius: 10,

        shadowRadius: 3.84,

        marginTop: 20,
    },

    synopsisImg: {
        marginTop: 26,
        width: 340,
        height: 164,
    },

    synopsisContent: {

        width: "90%",

        height: "auto",

        // justifyContent: "center",

        // alignItems: "center",

        borderWidth: 0.9,

        borderRadius: 10,

        marginTop: 0,

        marginLeft: 16,

        padding: 10,

        borderColor: colors.white,
    },

    // LoginPage
    loginContainer: {

        width: "100%",

        flex: 1,

        justifyContent: "center",

        alignItems: "center",

        backgroundColor: colors.mediumGray,
    },

    loginTitle: {

        width: 176,

        height: 68,

        fontSize: 36,

        fontWeight: "normal",

        lineHeight: 50,

        textAlign: "center",

        letterSpacing: -0.015,

        marginTop: 50,

        textTransform: "uppercase",

        color: colors.white,
    },

    loginCard: {

        width: 300,

        height: 464,

        borderRadius: 10,

        alignItems: "center",

        backgroundColor: colors.lighGray,
    },

    passwordGroup: {

        flexDirection: "row",

        alignItems: "stretch",
    },

    toggle: {

        marginTop: 10,

        marginLeft: -30,
    },

    imgEyes: {

        width: 25,

        height: 25,
    },

    textInput: {

        width: 265,

        height: 45,

        borderWidth: 1,

        borderRadius: 10,

        borderColor: colors.mediumGray,

        borderStyle: "solid",

        backgroundColor: "#FEFEFE",

        marginBottom: 20,

        padding: 10,
    },

    loginButton: {

        width: 250,

        height: 50,

        backgroundColor: colors.mediumYellow,

        borderRadius: 10,

        padding: 10,

        marginTop: 50,

        marginLeft: "auto",

        marginRight: "auto",

        justifyContent: "center",
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