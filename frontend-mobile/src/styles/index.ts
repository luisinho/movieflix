import { StyleSheet } from 'react-native';

const colors = {

    white: "#FFFFFF",

    black: "#000000",

    mediumYellow: "#FFC700",

    lightYellow: "#937d22",

    mediumGray: "#6C6C6C",

    mediumGrayP: "#525252",
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

    movieSubTitle: {

        fontSize: 14,

        fontWeight: "normal",

        lineHeight: 19,

        marginLeft: 16,

        marginBottom: 50,

        color: colors.white,
    }
});

const theme = StyleSheet.create({

    container: {

        flex: 1,

        justifyContent: "center",

        alignItems: "center",

        padding: 20,
    },

    card: {

        width: "100%",

        height: "100%",

        backgroundColor: colors.mediumGray,

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

        backgroundColor: colors.lightYellow,

        borderTopRightRadius: 10,

        borderBottomRightRadius: 10,

        alignItems: "center",

        justifyContent: "center",
    },

    // Catalog Movie Card
    scrollCatalogContainer: {

        padding: 0,
    },

    movieContainer: {

        flex: 1,

        justifyContent: "center",

        alignItems: "center",

        padding: 12,

        backgroundColor: colors.mediumGrayP,
    },

    movieCard: {

        width: 300,

        backgroundColor: colors.mediumGray,

        borderRadius: 10,

        shadowRadius: 3.84,
    },

    imgCatalog: {
        marginTop: 26,
        width: 300,
        height: 164,
    },

    movieTitle: {

    }
});

export { colors, text, theme };