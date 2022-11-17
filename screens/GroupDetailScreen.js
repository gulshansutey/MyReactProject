import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TodoTemp } from "../data/StaticDataSource"
import Colors from "../constants/colors";
import TodoList from "../component/TodoList";

function GroupDetailScreen({ route }) {

    const [todos, setTodods] = useState(TodoTemp)

    function onItemClick(data) {
            console.log(data);
    }

    const item = route.params.data
    return <View style={styles.container}>

        <Text style={styles.title}>{item.title}</Text>
        <View> </View>
        <TodoList todos={todos} onItemClick={onItemClick} />
    </View>
}

export default GroupDetailScreen;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        padding: 10,
        fontWeight: 'bold',
        color: Colors.textColorDark
    },
    container: {
        flex: 1, 

    },
    icon: {
        padding: 16,
    }
});
