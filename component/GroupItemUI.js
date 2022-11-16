import { Pressable, View, Text, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';
import Colors from "../constants/colors";
function GroupItemUI({ title, color, icon, id, onPress }) {
    const handleItemClick = () => { onPress(id) }
    return <View>
        <Pressable
            style={({ pressed }) => pressed ? { backgroundColor: Colors.accentLightRipple } : {}}
            android_ripple={{ color: Colors.accentLight }}>
            <View style={styles.container}>
                <Feather style={styles.icon} name={icon} size={24} color={color} />
                <Text style={styles.text}>{title}</Text>
            </View>
        </Pressable>
    </View>
}

export default GroupItemUI;

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        color: Colors.textColorDark
    },
    container: {
        flex: 1,
        marginTop: 1,
        alignItems: 'center',
        flexDirection: 'row'
    },
    icon: {
        padding: 16,
    }
});