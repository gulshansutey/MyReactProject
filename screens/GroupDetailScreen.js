import { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TodoTemp } from "../data/StaticDataSource"
import TodoList from "../component/TodoList";
import AddTaskButton from "../component/AddTaskButton"
import TaskInputUI from "../component/TaskInputUI"
import shadeColor from "../utils/Utils"
import { fetchTodos, insertTodo } from "../data/Database"
import TodoModel from "../models/TodoModel"

function GroupDetailScreen({ route, navigation }) {

    const [todos, setTodods] = useState()
    const [isAddTaskShowing, setAddTaskShowing] = useState(false)
    const grp = route.params.data
    const bg = shadeColor(0.80, grp.color)
    const btnBg = shadeColor(0.70, grp.color, "#ffffff")
    const tint = grp.color

    async function loadTodos() {
        const data = await fetchTodos(grp.id);
        setTodods(data.reverse());
    }

    useEffect(() => {
        loadTodos();
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: grp.title,
            headerStyle: {
                backgroundColor: bg,
            },
            headerTintColor: tint,
        });
    }, [navigation]);

    function onItemClick(data) {
    }

    function onOpen() {
        setAddTaskShowing(true)
    }

    function onClose() {
        setAddTaskShowing(false)
    }

    function addTask(todo) {
        insertTodo(new TodoModel(
            0,
            grp.id,
            todo.title,
            todo.desc,
            todo.date,
            false,
            false
        ))
        loadTodos()
    }

    return <View style={[styles.container, { backgroundColor: bg }]}>
        <TaskInputUI onClose={onClose} isVisible={isAddTaskShowing} tint={tint} onAddTask={addTask} />
        <Text style={[styles.title, { color: tint }]}>{grp.title}</Text>
        <TodoList todos={todos} tint={tint} onItemClick={onItemClick} />
        <AddTaskButton color={tint} bg={btnBg} onAddTask={onOpen} />
    </View>
}

export default GroupDetailScreen;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        padding: 10,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
    },
    icon: {
        padding: 16,
    }
});
