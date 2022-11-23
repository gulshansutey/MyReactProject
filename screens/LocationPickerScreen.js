import { View, Alert, StyleSheet, ActivityIndicator, Animated } from "react-native";
import { getCurrentPositionAsync, PermissionStatus, requestForegroundPermissionsAsync } from 'expo-location'
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useContext, useEffect, useRef, useState } from "react";
import Colors from '../constants/colors';
import { getVenues } from '../network/http'
import PlacesList from '../component/PlacesList';
import { TaskOptionsContext } from "../context/task-options-context";

function LocationPickerScreen() {
    const [location, setLocation] = useState();
    const [marker, setMarker] = useState();
    const [isLoading, setLoaded] = useState(true);
    const [places, setPlaces] = useState();
    const mapRef = useRef(null)

    useEffect(() => {
        (async () => {
            const status = await requestForegroundPermissionsAsync();
            if (status.status === "granted") {
                const loc = await getCurrentPositionAsync();
                const lat = loc.coords.latitude;
                const lng = loc.coords.longitude;
                setLocation({ lat: lat, lng: lng });
                setLoaded(false);
            }
            if (status === PermissionStatus.DENIED) {
                Alert.alert('Insufficent Permissions!',
                    'You need to grant location permission in order to alow this app to access and find your location ');
                setLoaded(false);
                return false;
            }
        })();
    }, [])

    useEffect(() => {
        (async () => {
            if (!isLoading) {
                const response = await getVenues(location.lat.toString() + "," + location.lng.toString())
                setPlaces(response);
            }
        })().catch(
            (error) => {
                console.log(error);
            }
        );
    }, [location, isLoading]);

    useEffect(() => {

        if (mapRef.current) {
            mapRef.current.animateCamera({
                center: {
                    latitude: (marker === undefined) ? location.lat : marker.lat,
                    longitude: (marker === undefined) ? location.lng : marker.lng,
                },
                duration: 3000
            })
        }
    }, [marker])

    function onMapTouch(event) {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        setLocation({ lat: lat, lng: lng });
    }

    if (isLoading) return <View style={styles.loader}>
        <ActivityIndicator color={Colors.primaryDark} />
    </View>

    function onItemSnap(data) {
        const coords = data.item.coords
        setMarker({ lat: coords.latitude, lng: coords.longitude })
    }

    return <View style={styles.matchParent}>

        <MapView
            ref={mapRef}
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

        {
            places && <PlacesList style={styles.bottomList} data={places} onItemSnap={onItemSnap} />
        }
    </View>


}


export default LocationPickerScreen;

const styles = StyleSheet.create({
    matchParent: {
        flex: 1
    },
    bottomList: {
        position: 'absolute',
        bottom: 30,
        width: "100%",
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})
