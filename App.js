import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View } from 'react-native';

import LoginScreen from './screens/LoginScreen';

export default function App() {

  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <LoginScreen />
    </View>
  );
}



