
import { FlatList, StyleSheet } from "react-native";

import GroupItemUI from "./GroupItemUI"

function GroupList({ groups, onItemClick }) {

    function renderGroupUI(groupItem) {
        return <GroupItemUI
            title={groupItem.item.title}
            color={groupItem.item.color}
            icon={groupItem.item.icon}
            onPress={onItemClick}
            id={groupItem.item.id} />
    }

    return <FlatList
        data={groups}
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