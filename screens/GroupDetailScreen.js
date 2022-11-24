import { useCallback, useContext, useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, AppState } from "react-native";
import TodoList from "../component/TodoList";
import AddTaskButton from "../component/AddTaskButton"
import TaskInputUI from "../component/TaskInputUI"
import shadeColor from "../utils/Utils"
import { fetchTodos, insertTodo } from "../data/Database"
import Route from '../constants/navigation'
import { TaskOptionsContext } from "../context/task-options-context";
import { useFocusEffect } from "@react-navigation/native";

function GroupDetailScreen({ route, navigation }) {

    const optionCtx = useContext(TaskOptionsContext);

    const [todos, setTodods] = useState()
    const [addTaskShowing, setAddTaskShowing] = useState(false)
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

    useFocusEffect(
        useCallback(() => { 
            if (optionCtx.hasState) {
                setAddTaskShowing(true);
            }
            return () => {
                //no-op
            };
        }, [optionCtx.hasState])
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            title: grp.title,
            headerStyle: {
                backgroundColor: bg,
            },
            headerTintColor: tint,
        });
    });

    function onItemClick(data) {
        navigation.navigate(
            Route.TaskDetailScreen,
            { bg: bg, btnBg: btnBg, tint: tint, data: data }
        )
    }

    function onOpen() { 
        setAddTaskShowing(true);
    }

    function onClose() {
        console.log("kjhgfdsfghj");
        optionCtx.reset()
        setAddTaskShowing(false);
    }

    function addTask(todo) { 
        todo.grpId = grp.id
        setAddTaskShowing(false);
        insertTodo(todo)
        loadTodos()
    }

    function onOptionClick(item) {
        if (item.id === "1") {
            navigation.navigate(Route.MapScreen);
        } else if (item.id === "4") {
            navigation.navigate(Route.AddNote);
        } else {
            console.log("Unknown option");
            return;
        }
        optionCtx.setState(true);
        setAddTaskShowing(false);
    }

    return <View style={[styles.container, { backgroundColor: bg }]}>
        <TaskInputUI
            onClose={onClose}
            isVisible={addTaskShowing}
            tint={tint}
            onAddTask={addTask}
            onAttachClick={onOptionClick}
            options={optionCtx.options} />
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
