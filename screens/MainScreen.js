import { View, StyleSheet, Platform, ToastAndroid, Alert, SafeAreaView, ScrollView, Text } from 'react-native'
import BottomBar from '../component/BottomBar';
import GroupList from '../component/GroupList';
import Dialog from 'react-native-dialog';
import { useState, useEffect, useCallback, useContext } from 'react';
import GroupModel from '../models/GroupModel';
import { DefaultGroup } from '../data/StaticDataSource'
import Route from '../constants/navigation'
import { insertGroup, fetchGroup } from '../data/Database'
import { TaskOptionsContext } from '../context/task-options-context';
import { useFocusEffect } from "@react-navigation/native";
import { clearDatabase } from "../data/Database"
function MainScreen({ navigation }) {

    const [addGroupDialogVisible, setAddGroupDialogVisible] = useState(false)
    const [groupTitle, setGroupTitle] = useState('')
    const [groups, setGroups] = useState([])
    const optionCtx = useContext(TaskOptionsContext);

    useEffect(() => {
        async function loadGroups() {
            const data = await fetchGroup();
            setGroups(DefaultGroup.concat(data));
        }

        if (groups !== undefined) {
            loadGroups()
        }

    }, []);
    useFocusEffect(
        useCallback(() => {
            if (optionCtx.hasState) {
                optionCtx.reset();
            }
            return () => {
                //unfocused
            };
        }, [])
    );

    function addNote() {
        clearDatabase();
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
        const group = new GroupModel(groups.length, groupTitle, "#133b80", "list")
        insertGroup(group)
        setGroups(current => [...current, group])
        setGroupTitle('');
    }

    function onDialogInput(text) {
        setGroupTitle(text);
    }

    const onItemClick = (id) => {
        const selectedGroup = groups.find((grp) => grp.id === id)
        navigation.navigate(Route.GroupDetailScreen, { data: selectedGroup, title: selectedGroup.title })
    }

    return <SafeAreaView style={style.safeArea}>
        <View style={style.parent}>

            <GroupList groups={groups} onItemClick={onItemClick} />
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