import { StyleSheet } from 'react-native';

const colors = {
    white: "#FFFFFF",
    black: "#000000",
    mediumYellow: "#FFC700",
    mediumGray: "#6C6C6C"
};

const theme = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20

    },

    card: {
        width: "100%",
        height: "100%",
        backgroundColor: colors.white,
        borderRadius: 20,
        alignItems: "center"
    },

    draw: {
        width: 313,
        height: 225,
    }
});

export { colors, theme };