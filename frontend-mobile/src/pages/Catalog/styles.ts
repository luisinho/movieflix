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

        width: 340,

        height: 164,

        marginTop: 26,
    },

    synopsisContent: {

        width: "90%",

        height: 310,

        borderWidth: 0.9,

        borderRadius: 10,

        marginTop: 0,

        marginLeft: 16,

        padding: 10,

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

        width: 310,

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

        width: 310,
    },

    textMarginTouchable: {

        marginLeft: "auto",

        marginRight: "auto",
    }
});

export { catalogTheme, movieTheme, synopsisTheme, reviewTheme };