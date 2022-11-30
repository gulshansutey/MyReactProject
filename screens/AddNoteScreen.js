import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { TextInput, View, Text, StyleSheet, Pressable } from "react-native";
import { TaskOptionsContext } from "../context/task-options-context";

function AddNoteScreen({ navigation }) {
    const [inputString, setInputString] = useState("");
    const optionCtx = useContext(TaskOptionsContext);

    function onAddTaskHandle() {
        optionCtx.update("4", { note: inputString }, "Note");
        optionCtx.setState(true);
        navigation.goBack(null);
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add Note",
            headerRight: () => (<Pressable onPress={() => {
                if((inputString.length > 0))onAddTaskHandle()
            }}>
                <Text style={(inputString.length > 0) ? [styles.headerButton, { color: "#2e5fff" }] : styles.headerButton}>Done</Text>
            </Pressable>)
        })
    }, [navigation, inputString])

    function onTextChange(text) {
        setInputString(text)
    }


    return <View style={styles.container}>

        <TextInput
            style={styles.addTaskTextInput}
            autoFocus={true}
            value={inputString}
            onChangeText={onTextChange}
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
        color: "#cdd6f1"
    }
})