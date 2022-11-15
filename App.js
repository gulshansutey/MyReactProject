import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';
import GroupDetailScreen from './screens/GroupDetailScreen';
import Route from './constants/navigation'

const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Route.HomeScreen} >
          <Stack.Screen name={Route.LoginScreen} component={LoginScreen} />
          <Stack.Screen name={Route.HomeScreen} component={MainScreen} />
          <Stack.Screen name={Route.GroupDetailScreen} component={GroupDetailScreen}
            options={({ route, navigation }) => { return { title: route.params.title } }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}



