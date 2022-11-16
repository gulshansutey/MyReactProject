import { FlatList, StyleSheet, View } from "react-native";

import { DefaultGroup } from "../data/StaticDataSource"
import GroupModel from "../models/GroupModel";
import GroupItemUI from "./GroupItemUI"


function renderGroupUI(groupItem) {
    return <GroupItemUI title={groupItem.item.title} color={groupItem.item.color} icon={groupItem.item.icon} />;
}

function GroupList() {

    return <FlatList
        data={DefaultGroup}
        keyExtractor={(item) => item.id}
        renderItem={renderGroupUI}
    />

}

export default GroupList;

const styles = StyleSheet.create({
    list: {
        borderBottomWidth: 1,
        borderBottomColor: "#c0c0c0",
    }
});