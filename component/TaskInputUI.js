import { View, StyleSheet, Modal, KeyboardAvoidingView, TouchableOpacity, Animated, TextInput } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

function TaskInputUI({ isVisible, onClose, tint }) {

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
                                placeholderTextColor="#605d5d"
                                placeholder="Write a task..." />
                        </View>
                        <View style={styles.actionButtons}>

                            <MaterialIcons
                                style={styles.icon}
                                name="map"
                                size={24}
                                color={tint} />
                            <MaterialIcons
                                style={styles.icon}
                                name="event"
                                size={24}
                                color={tint} />
                            <MaterialIcons
                                style={styles.icon}
                                name="add-alarm"
                                size={24}
                                color={tint} />
                            <MaterialIcons
                                style={styles.icon}
                                name="note"
                                size={24}
                                color={tint} />
                        </View>
                    </View>


                </Animated.View>
            </KeyboardAvoidingView>
        </Modal>
    </View>
}

export default TaskInputUI;


const styles = StyleSheet.create({

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