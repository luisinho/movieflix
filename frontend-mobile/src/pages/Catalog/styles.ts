import { StyleSheet } from 'react-native';

import { colors } from '../../styles';

const catalogTheme = StyleSheet.create({

    scrollCatalogContainer: {

        padding: 0,
    },

    // Search Combo
    searchComboContainer: {

        flex: 1,

        width: 300,

        height: 80,

        marginTop: 20,

        marginBottom: 20,

        borderRadius: 10,

        justifyContent: "center",

        alignItems: "center",

        backgroundColor: colors.lighGray,
    },

    searchCombo: {

        flex: 1,

        width: 275,

        marginTop: 5,

        marginBottom: 5,

        borderWidth: 0.9,

        borderRadius: 10,

        justifyContent: "center",

        borderColor: colors.white,
    },

    itemPicker: {

        color: colors.white,

        backgroundColor: colors.lighGray,
    },
});

// Movie Card
const movieTheme = StyleSheet.create({

    movieCard: {

        width: 300,

        borderRadius: 10,

        shadowRadius: 3.84,

        marginBottom: 20,

        backgroundColor: colors.lighGray,
    },

    movieImgCatalog: {

        width: 300,

        height: 164,

        marginTop: 26,
    },

});

// Synopsis
const synopsisTheme = StyleSheet.create({

    synopsisCard: {

        width: 340,

        height: 650,

        borderRadius: 10,

        shadowRadius: 3.84,

        marginTop: 20,

        marginLeft: "auto",

        marginRight: "auto",

        backgroundColor: colors.lighGray,
    },

    synopsisImg: {

        width: 310,

        height: 164,

        marginTop: 26,

        marginLeft: "auto",

        marginRight: "auto",
    },

    synopsisContent: {

        width: "95%",

        height: 310,

        borderWidth: 0.9,

        borderRadius: 10,

        padding: 10,

        marginLeft: "auto",

        marginRight: "auto",

        borderColor: colors.white,
    },

    synopsisMargin: {

        marginTop: 20,

    },
});

const reviewTheme = StyleSheet.create({

    reviewCard: {

        width: 340,

        height: 185,

        marginTop: 20,

        borderRadius: 10,

        shadowRadius: 3.84,

        marginLeft: "auto",

        marginRight: "auto",

        alignContent: "center",

        alignItems: "center",

        backgroundColor: colors.lighGray,
    },

    // ReviewForm
    reviewTextInput: {

        width: 320,

        height: 80,

        marginTop: 20,

        marginBottom: 20,

        padding: 10,

        borderWidth: 1,

        borderRadius: 10,

        borderColor: "#E1E1E1",

        borderStyle: "solid",

        backgroundColor: "#FEFEFE",

        shadowColor: colors.mediumGray,
    },

    widthTouchable: {

        width: 320,
    },

    textMarginTouchable: {

        marginLeft: "auto",

        marginRight: "auto",
    },
});

const listReviewTheme = StyleSheet.create({

    listCard: {

        width: 340,

        height: 185,

        marginTop: 20,

        borderRadius: 10,

        shadowRadius: 3.84,

        marginLeft: "auto",

        marginRight: "auto",

        alignContent: "center",

        alignItems: "center",

        backgroundColor: colors.lighGray,
    },

    reviewImgContainer: {

        flexDirection: "row",

        alignSelf: "stretch",

        marginTop: 12,
    },

    reviewImg: {

        width: 14,

        height: 14,

        marginLeft: 15,
    },

    reviewNameUser: {

        width: 130,

        height: 15,

        marginLeft: 5,

        fontSize: 12.5,

        lineHeight: 17,

        letterSpacing: -0.015,

        fontStyle: "normal",

        fontWeight: "bold",

        color: colors.white,
    },

    reviewDate: {

        width: 160,

        height: 15,

        fontSize: 12.5,

        lineHeight: 17,

        letterSpacing: -0.015,

        fontStyle: "normal",

        fontWeight: "bold",

        color: colors.white,
    },

    reviewContent: {

        width: "95%",

        height: "auto",

        marginTop: 10,

        borderWidth: 0.9,

        borderRadius: 10,

        padding: 10,

        marginLeft: "auto",

        marginRight: "auto",

        borderColor: colors.white,
    }
});

export { catalogTheme, movieTheme, synopsisTheme, reviewTheme, listReviewTheme };