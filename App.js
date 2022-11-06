import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [getUsername, setUsername] = useState('');
  const [getLogs, setLogs] = useState([]);

  function usernameListener(text) {
    setUsername(text)
  }

  function onSigninPress() {
    console.log(getUsername)
    setLogs((currentItems) => [...currentItems, getUsername])
  }

  return (
    <View style={{ flex: 1, padding: 50, backgroundColor: '#ebecf0' }}>

      <View style={styles.title}>
        <Text style={styles.textTitle}>Hello There!</Text>
        <Text style={styles.desc}>Welcome to React Native development tutorial!</Text>

      </View>

      <TextInput
        style={styles.textInput}
        onChangeText={usernameListener}
        placeholder="Username" />

      <TextInput
        style={styles.textInput}
        secureTextEntry={true}
        placeholder="Password" />

      <View style={{ alignItems: 'flex-end', marginVertical: 15 }}>
        <Text>Recover Password</Text>
      </View>

      <Button title='Sign in' color='red' onPress={onSigninPress} />

      <View style={{ borderWidth: 1, borderColor: 'red', padding: 20, backgroundColor: '#ccc' }}>

        <Text>Sign in console</Text>
        {getLogs.map((item) => <Text>{item}</Text>)}

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    alignItems: "center",
  },

  desc: {
    margin: 10,
    textAlign: 'center'
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginTop: 20
  },

  textTitle: {
    margin: 10,
    padding: 10,
    fontSize: 24,
    alignItems: "center",
  }
});

