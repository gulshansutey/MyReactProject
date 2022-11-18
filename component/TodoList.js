
import { FlatList, StyleSheet } from "react-native";

import TodoItemUI from "./TodoItemUI"

function TodoList({ todos, tint, onItemClick }) {

    function renderTodoUI(todo) {
        return <TodoItemUI
            todo={todo.item}
            tint={tint}
            onPress={onItemClick}
        />
    }

    return <FlatList
        data={todos}
        contentContainerStyle={{ paddingBottom: 100 }}
        keyExtractor={(item) => item.id}
        renderItem={renderTodoUI}
    />

}

export default TodoList;

 