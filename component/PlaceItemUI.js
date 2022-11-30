import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import { TaskOptionsContext } from "../context/task-options-context";

function PlaceItemUI({ data }) {
    const navigation = useNavigation();
    const optionCtx = useContext(TaskOptionsContext)
    const img = data.image.prefix + "120" + data.image.suffix
    const pic = data.picture.prefix + "1200x800" + data.picture.suffix

    function onPlaceSelected() {
        optionCtx.update("1", data, data.title);
        navigation.goBack();
    }

    return <View style={styles.shadow}>
        <Pressable onPress={onPlaceSelected}>
            <View style={styles.container}>

                <Image
                    style={styles.banner}
                    source={{ uri: pic }}
                />
                <Image
                    style={styles.icon}
                    source={{ uri: img }}
                />
                <Text
                    numberOfLines={1}
                    ellipsizeMode='tail'
                    style={styles.title}>{data.title}</Text>

            </View>
        </Pressable>

    </View>
}

export default PlaceItemUI;

const styles = StyleSheet.create({
    shadow: {
        width: 250,
        height: 200,
        margin: 10,
        borderRadius: 10,
        backgroundColor: "#ffffff",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        elevation: 4,
        overflow: Platform.OS === 'ios' ? false : "hidden"
    },
    container: {
        borderRadius: 10,
        overflow: Platform.OS === 'ios' ? true : "visible"
    },
    title: {
        fontSize: 16,
        padding: 10,
        position: 'absolute',
        bottom: 0,
        width: "100%",
        backgroundColor: "#ffffff"
    },
    banner: {
        width: "100%",
        height: "100%",
        backgroundColor: "#a53e3e"
    },
    icon: {
        width: 30,
        height: 30,
        backgroundColor: "#23222286",
        top: 0,
        margin: 5,
        position: 'absolute',
        right: 0,
    }
});
