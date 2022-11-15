import { View, Pressable, StyleSheet, Text } from 'react-native'
import Colors from '../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';

function BottomBar({ onAddNote, onAddGroup }) {
    return <View style={style.bottomBar}>

        <Pressable
            style={({ pressed }) => pressed ? [style.iosPressed, style.addButton] : style.addButton}
            onPress={onAddNote}>
            {
                ({ pressed }) => (<View style={style.addButtonView}>
                    <MaterialIcons name="add" size={28} color={pressed ? Colors.accentDark : Colors.primaryDark} />
                    <Text style={ pressed ? [style.addNodeText, { color: Colors.accentDark} ] : style.addNodeText }
                    >Add Note</Text>

                </View>)
            }
        </Pressable>

        <Pressable
            style={({ pressed }) => pressed ? [style.iosPressed, style.addButton] : style.addButton}
            onPress={onAddGroup}>
            {
                ({ pressed }) => (<MaterialIcons name="post-add" size={28} color={pressed ? Colors.accentDark : Colors.primaryDark} />)
            }
        </Pressable>

    </View>
}

export default BottomBar;


const style = StyleSheet.create({

    bottomBar: {
        bottom: 0,
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'space-between',
        position: 'absolute',
        borderTopColor: "#d6d6d6",
        borderTopWidth: 1,
    },
    addButtonView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    addButton: {
        elevation: 4,
        padding: 12,
        shadowRadius: 4,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3
    },
    iosPressed: {
        opacity: 0.9
    },
    addNodeText: {
        paddingHorizontal: 12,
        fontSize:16,
        fontWeight:'normal',
        color: Colors.primaryDark
    }

});