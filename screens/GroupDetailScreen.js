import { View, Text } from "react-native";


function GroupDetailScreen({ route }) {
const item = route.params.data
    return <View>

        <Text>{item.title}</Text>

    </View>
}

export default GroupDetailScreen;
