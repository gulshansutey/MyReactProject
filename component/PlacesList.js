import { useCallback } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import PlaceItemUI from "../component/PlaceItemUI";

function renderUI(item) {
    
    return <PlaceItemUI data={item.item} />
}

function PlacesList({ style, data, onItemSnap, onItemSelected }) {
    const handleVieweableItemsChanged = useCallback(({ viewableItems }) => {
        onItemSnap(viewableItems[0])
    }, []);
    return <View style={[style, styles.modalSubContainer]}>
        <FlatList
            data={data}
            horizontal={true}
            pagingEnabled={true}
            snapToAlignment='start'
            snapToInterval={270}
            decelerationRate={"fast"}
            contentContainerStyle={styles.alignItemsCenter}
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
            onViewableItemsChanged={handleVieweableItemsChanged}
            showsHorizontalScrollIndicator={false}
            key={(item) => {
                //console.log(item);
            }}
            renderItem={renderUI}
        />
    </View>

}

export default PlacesList;

const styles = StyleSheet.create({
    modalSubContainer: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    viewPagerTextStyle: {
        textAlign: "center",
        justifyContent: 'center'
    }
})