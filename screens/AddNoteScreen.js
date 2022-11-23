import { useContext, useLayoutEffect, useState } from "react";
import { TextInput, View, Text, StyleSheet, Pressable } from "react-native";
import { TaskOptionsContext } from "../context/task-options-context";



function AddNoteScreen({ navigation }) {
    const [input, setInput] = useState("")
    const optionCtx = useContext(TaskOptionsContext)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add Note",
            headerRight: () => (<Pressable onPress={onAddTaskHandle}>
                <Text style={styles.headerButton}>Done</Text>
            </Pressable>)
        })
    }, [])

    function onAddTaskHandle() {
        console.log(input);
        optionCtx.update("4", { note: input }, "Note")
        navigation.goBack();
    }

    return <View style={styles.container}>

        <TextInput
            style={styles.addTaskTextInput}
            autoFocus={true}
            color="#953c3c"
            value={input}
            onChangeText={(text) => setInput(text)}
            placeholderTextColor="#605d5d"
            placeholder="Write a task..." />

    </View>
}


export default AddNoteScreen;


const styles = StyleSheet.create({
    addTaskTextInput: {
        fontSize: 18,
        padding: 20,
        width: "100%",
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    headerButton: {
        fontSize: 16,
        color: "#2e5fff"
    }
})