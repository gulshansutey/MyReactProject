
import { FlatList, StyleSheet } from "react-native";

import TodoItemUI from "./TodoItemUI"

function TodoList({ todos, onItemClick }) {

    function renderTodoUI(todo) {
        return <TodoItemUI
            todo={todo.item}
            onPress={onItemClick}
        />
    }

    return <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={renderTodoUI}
    />

}

export default TodoList;

const styles = StyleSheet.create({
    list: {
        borderBottomWidth: 1,
        borderBottomColor: "#c0c0c0",
        borderRadius: 10
    }
});