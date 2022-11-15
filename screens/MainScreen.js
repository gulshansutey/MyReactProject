import { View, Pressable, StyleSheet, Platform, ToastAndroid, Alert, SafeAreaView, ScrollView, Text } from 'react-native'
import BottomBar from '../component/BottomBar';
import GroupList from '../component/GroupList';
import Dialog from 'react-native-dialog';
import { useState } from 'react';

function MainScreen() {

    const [addGroupDialogVisible, setAddGroupDialogVisible] = useState(false)
    const [groupTitle, setGroupTitle] = useState('')
    function addNote() {
        if (Platform.OS === 'android') {
            ToastAndroid.show("Add note", ToastAndroid.SHORT)
        } else {
            Alert.alert("Add note")
        }
    }

    function addGroup() {
        setAddGroupDialogVisible(true)
    }

    function onDialogDismiss() {
        setAddGroupDialogVisible(false)
    }

    function onDialogCreate() {
        setAddGroupDialogVisible(false)
        Alert.alert(groupTitle)
        setGroupTitle('');
    }

    function onDialogInput(text) {
        setGroupTitle(text);
    }

    return <SafeAreaView style={style.safeArea}>
        <View style={style.parent}>
            <GroupList />
            <BottomBar onAddNote={addNote} onAddGroup={addGroup} />
            <View>
                <Dialog.Container visible={addGroupDialogVisible}>
                    <Dialog.Title>New Group</Dialog.Title>
                    <Dialog.Description>
                        Add a new group for your todos list.
                    </Dialog.Description>
                    <Dialog.Input
                        onChangeText={onDialogInput}
                        value={groupTitle}
                        placeholder="Create a group"
                    />
                    <Dialog.Button label="Cancel" bold="true" onPress={onDialogDismiss} />
                    <Dialog.Button label="Create" onPress={onDialogCreate} disabled={groupTitle.length <= 0 ? true : false} />
                </Dialog.Container>
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

});