import { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Colors from "../constants/colors";
import { MaterialIcons } from '@expo/vector-icons';
import longToDate from "../utils/DateUtils";
import PlaceMapUI from "../component/PlaceMapUI";

function TaskDetailScreen({ route, navigation }) {

    const bg = route.params.bg
    const tint = route.params.tint
    const data = route.params.data
    const location = JSON.parse(data.location);
    const [isComplete, setComplete] = useState(data.isComplete === 1)
    const [isFavorite, setFavorite] = useState(data.isFavorite === 1)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Task Details",
            headerStyle: {
                backgroundColor: bg,
            },
            headerTintColor: tint,
        });
    });

    return <View style={[styles.container, { backgroundColor: bg }]}>
        <View style={styles.label}>
            <Pressable  >
                <MaterialIcons
                    style={styles.icon}
                    name={isComplete ? "check-circle" : "radio-button-unchecked"}
                    size={28}
                    color={tint} />
            </Pressable>
            <Text style={[styles.text, { color: tint }]}>{data.title}</Text>
            <Pressable  >
                <MaterialIcons
                    style={styles.icon}
                    name={isFavorite ? "star" : "star-border"}
                    size={28}
                    color={tint} />
            </Pressable>
        </View>

        <View style={styles.label}>

            <MaterialIcons
                style={styles.icon}
                name={"note"}
                size={28}
                color={tint} />

            <Text style={[styles.text, { color: tint }]}>{data.desc}</Text>
            <Pressable  >
                <MaterialIcons
                    style={styles.icon}
                    name={"close"}
                    size={18}
                    color={tint} />
            </Pressable>
        </View>
        {location.title && <View style={styles.label}>
            <MaterialIcons
                style={styles.icon}
                name={"place"}
                size={28}
                color={tint} />
            <Text style={[styles.text, { color: tint }]}>{location.title}</Text>
            <Pressable  >
                <MaterialIcons
                    style={styles.icon}
                    name={"close"}
                    size={18}
                    color={tint} />
            </Pressable>

        </View>}

        {location.coords && <View style={styles.mapView}>
            <PlaceMapUI
                location={{ lat: location.coords.latitude, lng: location.coords.longitude }}
                marker={{ lat: location.coords.latitude, lng: location.coords.longitude }}
            />
        </View>}
        <Text style={styles.bottomLabel}>{"Created " + longToDate(data.date)}</Text>
    </View>
}

export default TaskDetailScreen;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        padding: 10,
        fontWeight: 'bold',
    },
    mapView: {
        width: "100%",
        height: "50%",
        backgroundColor: "#ffffff"
    },
    container: {
        flex: 1,
    },
    icon: {
        padding: 16,
    },
    label: {
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: "#00000011",
        marginHorizontal: 10
    },

    text: {
        flex: 1,
        fontSize: 18,
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        color: Colors.textColorDark
    },

    bottomLabel: {
        position: 'absolute',
        bottom: 30,
        width: "100%",
        color: "#3e3d3d55",
        paddingHorizontal: 20,
        textAlign: 'center'
    }

});
