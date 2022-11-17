import { Pressable, View, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";

function TodoItemUI({ todo, onPress }) {

    const [isComplete, setComplete] = useState(todo.isComplete)
    const [isFavorite, setFavorite] = useState(todo.isFavorite)

    const handleItemClick = () => { onPress(todo.id) }
    const handleOnComplete = () => { setComplete(!isComplete) }
    const handleOnFavorite = () => { setFavorite(!isFavorite) }
    return <View>
        <Pressable onPress={handleItemClick}>
            <View style={styles.container}>

                <Pressable onPress={handleOnComplete}>
                    <MaterialIcons
                        style={styles.icon}
                        name={isComplete ? "check-circle" : "radio-button-unchecked"}
                        size={24}
                        color={Colors.primaryDark} />
                </Pressable>
                <Text style={styles.text}>{todo.title}</Text>
                <Pressable onPress={handleOnComplete}>
                    <MaterialIcons
                        style={styles.icon}
                        name={isFavorite ? "star" : "star-border"}
                        size={24}
                        color={Colors.primaryDark} />
                </Pressable>
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
        marginTop: 1,
        alignItems: 'center',
        flexDirection: 'row'
    },
    icon: {
        padding: 16,
    }
});