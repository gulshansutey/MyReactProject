import { View, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

function PlaceMapUI({ location, marker, onMapTouch }) {

    return <View style={styles.matchParent}>

        <MapView
            style={styles.matchParent}
            onPress={onMapTouch}
            provider={PROVIDER_GOOGLE}
            showsScale={true}
            showsCompass={true}
            initialCamera={{
                center: {
                    latitude: location.lat,
                    longitude: location.lng,
                },
                heading: 0,
                altitude: 10,
                pitch: 0,
                zoom: 16,
            }}
        >
            {marker && <Marker coordinate={{
                latitude: marker.lat,
                longitude: marker.lng
            }}
            />}
        </MapView >

    </View>

}

const styles = StyleSheet.create({
    matchParent: {
        flex: 1
    },
    bottomList: {
        position: 'absolute',
        bottom: 10,
        width: "100%",
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})


export default PlaceMapUI;