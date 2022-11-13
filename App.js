import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';

const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='home'>
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="home" component={MainScreen} />
        </Stack.Navigator>
      </NavigationContainer>

    </View>
  );
}



