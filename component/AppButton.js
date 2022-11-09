import { View, Text, StyleSheet, Pressable } from "react-native";
import Colors from '../constants/colors';

function AppButton({ children, onPress }) {
    return <View style={styles.container}>
        <Pressable
            style={({ pressed }) => pressed ? [styles.rippleContainer, styles.iosPressed] : styles.rippleContainer}
            onPress={onPress}
            android_ripple={{ color: "#0000005b" }}>
            <Text style={styles.button}>{children}</Text>
        </Pressable>
    </View>
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
    },
    rippleContainer: {
        backgroundColor: Colors.accentDark,
        borderRadius: 15,
        paddingVertical: 18,
        elevation: 4,
        shadowRadius: 4,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3
    },
    iosPressed: {
        opacity: 0.9
    },
    button: {
        color: "white",
        textAlign: "center",
    }
});

export default AppButton;