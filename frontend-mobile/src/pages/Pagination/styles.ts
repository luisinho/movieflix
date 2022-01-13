import { StyleSheet } from 'react-native';

const theme = StyleSheet.create({

    paginationContainer: {

        flexDirection: "row",

        alignItems: "center",

        justifyContent: "center",

        width: 300,
    },

    paginationItem: {

        width: 40,

        height: 40,

        borderRadius: 50,

        fontSize: 18,

        fontWeight: "bold",

        lineHeight: 35,

        letterSpacing: -0.015,

        marginRight: 10,

        textAlign: "center",

        color: "#FFFFFF",
    },

    paginationPrevious: {

        transform: [{ rotate: '-180deg' }],

        marginRight: 10,
    },

    paginationNext: {

        marginLeft: 10,
    },

    colorYellow: {

        backgroundColor: "#FFC700",
    },

    colorGray: {

        backgroundColor: "#6C6C6C",
    },

    pageActive: {

        tintColor: "#FFC700",
    },

    pageInactive: {

        tintColor: "#9E9E9E",
    }
});

export { theme };