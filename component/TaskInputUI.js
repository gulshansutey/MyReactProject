import { View, StyleSheet, Modal, Text, KeyboardAvoidingView, TouchableOpacity, Animated, TextInput, Pressable, FlatList } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { TaskOptionsContext } from '../context/task-options-context';

function TaskInputUI({ isVisible, onClose, tint, onAddTask, onAttachClick, options }) {

    const taskCtx = useContext(TaskOptionsContext);
    const [input, setInput] = useState("")
    const [desc, setDesc] = useState("")


    function onAddTaskHandle() {
        onAddTask({
            title: input,
            desc: desc,
            date: new Date().valueOf(),
        });
        setInput("");
    }

    function renderItem(i) {
        const item = i.item;
        return <Pressable onPress={() => { onAttachClick(item) }}>
            <View style={styles.optionContainer}>
                <MaterialIcons
                    style={styles.icon}
                    name={item.icon}
                    size={24}
                    color={tint} />

                {
                    item.title && <Text>{item.title}</Text>
                }
            </View>


        </Pressable>
    }

    return <View>
        <Modal
            visible={isVisible}
            transparent={true}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                enabled={true}
                behavior="padding"
                style={[styles.wrapper]}
            >
                <TouchableOpacity
                    style={styles.mask}
                    activeOpacity={1}
                    onPress={onClose}
                />
                <Animated.View style={styles.container}>
                    <View>
                        <View style={styles.inputContainer}>
                            <MaterialIcons
                                style={styles.icon}
                                name="radio-button-unchecked"
                                size={28}
                                color={tint} />

                            <TextInput
                                style={styles.addTaskTextInput}
                                autoFocus={true}
                                color={tint}
                                value={input}
                                blurOnSubmit={false}
                                onSubmitEditing={onAddTaskHandle}
                                onChangeText={(text) => setInput(text.trim())}
                                placeholderTextColor="#605d5d"
                                placeholder="Write a task..." />

                        </View>
                        <View style={styles.actionButtons}>
                            <FlatList data={options}
                                keyboardShouldPersistTaps='always'
                                horizontal={true}
                                keyExtractor={(item) => item.id}
                                renderItem={renderItem}
                            />
                        </View>
                    </View>

                </Animated.View>
            </KeyboardAvoidingView>
        </Modal>
    </View>
}

export default TaskInputUI;


const styles = StyleSheet.create({

    optionContainer: {
        flexDirection: 'row'
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",

    },
    icon: {
        padding: 10
    },
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    addTaskTextInput: {
        flex: 1,
        fontSize: 18,
        paddingVertical: 10,
    },

    wrapper: {
        flex: 1,
        backgroundColor: "#00000077"
    },
    mask: {
        flex: 1,
        backgroundColor: "transparent"
    },
    container: {
        backgroundColor: "#fff",
        width: "100%",
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        height: 130,
        padding: 12,
    },

});