import { View, Pressable, StyleSheet, Platform, ToastAndroid, Alert, SafeAreaView, ScrollView, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
function MainScreen() {
    function addNode() {
        if (Platform.OS === 'android') {
            ToastAndroid.show("Toast", ToastAndroid.SHORT)
        } else {
            Alert.alert("Toast")
        }
    }

    return <SafeAreaView style={style.safeArea}>

        <View style={style.parent}>

            <View style={style.bottomBar}>
                <Pressable
                    style={({ pressed }) => pressed ? [style.iosPressed, style.addButton] : style.addButton}
                    onPress={addNode}>
                    {
                        ({ pressed }) => (<MaterialIcons name="post-add" size={28} color={pressed ? "#e7e7e7" : "#1f55b8"} />)
                    }
                </Pressable>
            </View>

        </View>
    </SafeAreaView>
}

export default MainScreen;

const style = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    parent: {
        flex: 1,
    },
    bottomBar: {
        bottom: 0,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'flex-end',
        position: 'absolute',
        borderTopColor: "#d6d6d6",
        borderTopWidth: 1,
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

});