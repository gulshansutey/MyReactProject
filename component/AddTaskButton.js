import { View, Pressable, StyleSheet, Text } from 'react-native' 
import { MaterialIcons } from '@expo/vector-icons';

function AddTaskButton({ color, bg, onAddTask }) {
    return <View style={style.bottomBar}>

        <Pressable
            style={({ pressed }) => pressed ? [style.iosPressed, style.addButton] : style.addButton}
            onPress={onAddTask}>
            {
                ({ pressed }) => (
                    <View style={[style.addButtonView, { backgroundColor: bg }]}>
                        <MaterialIcons name="add" size={32} color={color} />
                        <Text style={[style.addTaskText, { color: color }]}
                        >Add a Task</Text>
                    </View>
                )
            }
        </Pressable>

    </View>
}

export default AddTaskButton;


const style = StyleSheet.create({

    bottomBar: {
        bottom: 0,
        width: "100%",
        position: 'absolute',
    },
    addButtonView: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
    },
    addButton: {
        padding: 12,
        margin: 20,
    },
    iosPressed: {
        opacity: 0.9
    },
    addTaskText: {
        paddingHorizontal: 12,
        fontSize: 16,
        fontWeight: 'normal',
    }

});