import { View, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { getCurrentPositionAsync, PermissionStatus, requestForegroundPermissionsAsync } from 'expo-location'
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect, useState } from "react";
import Colors from '../constants/colors';
import { getVenues } from '../network/http'

function LocationPickerScreen() {

    const [location, setLocation] = useState();
    const [isLoading, setLoaded] = useState(true);
    const [places, setPlaces] = useState();

    useEffect(() => {
        (async () => {
            console.log("1");
            const status = await requestForegroundPermissionsAsync();
            console.log("2");
            if (status.status === "granted") {
                console.log("3");
                const loc = await getCurrentPositionAsync();
                console.log("4");
                console.log(loc.coords.longitude);
                console.log("5");
                setLocation({ lat: loc.coords.latitude, lng: loc.coords.longitude });
                console.log("6");
                setLoaded(false);
                await getVenues(location.lat + "," + location.lng).then((response) => {
                    setPlaces(response.data.results)
                    console.log(response.data.results);
                }).catch((error) => {
                    console.log("Error -- " + error);
                })

            }
            if (status === PermissionStatus.DENIED) {
                Alert.alert('Insufficent Permissions!',
                    'You need to grant location permission in order to alow this app to access and find your location ');
                setLoaded(false);
                return false;
            }
        })();
    }, [])

    function onMapTouch(event) {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        setLocation({ lat: lat, lng: lng });
    }

    if (isLoading) return <View style={styles.loader}>
        <ActivityIndicator color={Colors.primaryDark} />
    </View>

    return <MapView
        style={styles.map}
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
        {location && <Marker coordinate={{
            latitude: location.lat,
            longitude: location.lng
        }}
        />}
    </MapView >;
}

export default LocationPickerScreen;

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})
