import { StyleSheet } from 'react-native';

const colors = {

    white: "#FFFFFF",

    black: "#000000",

    mediumYellow: "#FFC700",

    lighYellow: "#937d22",

    lighGray: "#6C6C6C",

    mediumGray: "#525252",
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

        flex: 1,

        backgroundColor: colors.mediumGray,
    }

});

export { colors, text, theme };