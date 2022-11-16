import { Pressable, View, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";
function TodoItemUI({ todo, onPress }) {
    const handleItemClick = () => { onPress(todo.id) }
    console.log(todo);
    return <View>
        <Pressable onPress={handleItemClick}>
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
        padding:5,
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