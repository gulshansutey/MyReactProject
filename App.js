import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';
import GroupDetailScreen from './screens/GroupDetailScreen';
import LocationPickerScreen from './screens/LocationPickerScreen';
import Route from './constants/navigation'
import { useCallback, useEffect, useState } from 'react';
import { init } from './data/Database';
import * as SplashScreen from "expo-splash-screen";
import shadeColor from './utils/Utils'


const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync().catch(() => {
  console.log("error-preventAutoHideAsync");
});

export default function App() {

  const [isDbInit, setIsDbInit] = useState(false);

  useEffect(() => {
    init().then(() => {
      setIsDbInit(true)
    })
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isDbInit) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [isDbInit])

  if (!isDbInit) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Route.MapScreen} >
          <Stack.Screen name={Route.LoginScreen} component={LoginScreen} />
          <Stack.Screen name={Route.HomeScreen} component={MainScreen} />
          <Stack.Screen name={Route.GroupDetailScreen} component={GroupDetailScreen} />
          <Stack.Screen name={Route.MapScreen} component={LocationPickerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}



