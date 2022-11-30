import { View, StyleSheet, Modal, Text, KeyboardAvoidingView, TouchableOpacity, Animated, TextInput, Pressable, FlatList } from 'react-native'
import { MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { TaskOptionsContext } from '../context/task-options-context';
import Todo from '../models/TodoModel';

function TaskInputUI({ isVisible, onClose, tint, onAddTask, onAttachClick, options }) {

    const optionsCtx = useContext(TaskOptionsContext);
    const [input, setInput] = useState("")

    function onAddTaskHandle() {
        onAddTask(new Todo(
            "",
            "",
            input,
            optionsCtx.note,
            new Date().valueOf(),
            false,
            false,
            optionsCtx.location
        ));
        setInput("");
    }

    function onCloseListner() {
        setInput("")
        onClose()
    }

    function renderItem(i) {
        const item = i.item;
        if (item.title) {
            return <View style={[styles.activeOption, { backgroundColor: tint }]} >
                <MaterialIcons
                    style={styles.icon}
                    name={item.icon}
                    size={24}
                    color="#ffffff" />
                <Text style={styles.activeOptionText}>{item.title}</Text>
                <Pressable onPress={() => { optionsCtx.clear(item.id) }}>
                    <AntDesign
                        style={styles.icon}
                        name="closecircle"
                        size={18}
                        color="#ffffff" />
                </Pressable>
            </View >

        }


        return <Pressable onPress={() => { onAttachClick(item) }}>
            <View style={styles.optionContainer}>
                <MaterialIcons
                    style={styles.icon}
                    name={item.icon}
                    size={24}
                    color={tint} />
            </View>
        </Pressable>
    }

    return <View>
        <Modal
            visible={isVisible}
            transparent={true}
            onRequestClose={onCloseListner}
        >
            <KeyboardAvoidingView
                enabled={true}
                behavior="padding"
                style={[styles.wrapper]}
            >
                <TouchableOpacity
                    style={styles.mask}
                    activeOpacity={1}
                    onPress={onCloseListner}
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
                                onChangeText={(text) => setInput(text)}
                                placeholderTextColor="#605d5d"
                                placeholder="Write a task..." />
                            <Pressable onPress={() => { if (input) { onAddTaskHandle() } }}>
                                <MaterialCommunityIcons
                                    style={styles.icon}
                                    name="arrow-up-box"
                                    size={28}
                                    color={(input) ? tint : "#605d5d"} />
                            </Pressable>

                        </View>
                        <View style={styles.actionButtons}>
                            <FlatList data={options}
                                keyboardShouldPersistTaps='always'
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
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
    activeOption: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
        marginHorizontal: 8,
        borderRadius: 50,
    },
    activeOptionText: {
        fontSize: 16,
        padding: 4,
        color: "#ffffff",
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center'
    },

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