import { FlatList, Text, View } from "react-native";
import PlaceItemUI from "../component/PlaceItemUI";

function renderUI(item) {
    return <PlaceItemUI data={item.item} />
}

function PlacesList({ style, data }) {

    return <FlatList style={style}
        data={data}
        horizontal={true}
        key={(item) => {
            console.log(item);
        }}
        renderItem={renderUI}
    />

}

export default PlacesList;