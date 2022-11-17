import { Pressable, View, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";
function TodoItemUI({ todo, onPress }) {
    const handleItemClick = () => { onPress(todo.id) }
    console.log(todo);
    return <View>
        <Pressable
            style={({ pressed }) => pressed ? { backgroundColor: Colors.accentLightRipple } : {}}
            android_ripple={{ color: Colors.accentLight }}
            onPress={handleItemClick}>
            <View style={styles.container}>
                <Text style={styles.text}>{todo.title}</Text>
            </View>
        </Pressable>
    </View>
}

export default TodoItemUI;

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        padding: 5,
        color: Colors.textColorDark
    },
    container: {
        flex: 1,
        padding: 20,
        margin: 5,
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 4,
        shadowRadius: 2,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        alignItems: 'center',
        flexDirection: 'row'
    },
    icon: {
        padding: 16,
    }
});