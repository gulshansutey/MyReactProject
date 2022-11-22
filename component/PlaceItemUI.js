import { View, StyleSheet, Image, Text } from "react-native";

function PlaceItemUI({ data }) {
    const img = data.image.prefix + "120" + data.image.suffix
    const pic = data.picture.prefix + "1200x800" + data.picture.suffix

    return <View style={styles.shadow}>
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


        </View></View>
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
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        overflow: false
    },
    container: {
        borderRadius: 10,
        overflow: true
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
