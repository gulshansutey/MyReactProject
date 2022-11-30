import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import Route from '../constants/navigation'
import AppButton from "../component/AppButton"
import Colors from '../constants/colors';

function LoginScreen({ navigation }) {

    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function usernameListener(text) {
        setUsername(text.trim());
    }

    function passwordListener(text) {
        setPassword(text.trim());
    }

    function invalidateUserName() {
        setUsername('');
    }

    function invalidatePassword() {
        setPassword('');
    }

    function navigate() {
        invalidatePassword();
        navigation.reset({
            index: 0,
            routes: [{ name: Route.HomeScreen }]
        });
    }

    function onSigninPress() {
        if (userName.length < 5) {
            Alert.alert('Invalid Username',
                'Username length shuold be 5 or more ',
                [{ text: 'Okay', style: 'destructive', onPress: invalidateUserName }])
        } else if (password.length < 5) {
            Alert.alert('Invalid Password',
                'Username length shuold be 5 or more ',
                [{ text: 'Okay', style: 'destructive', onPress: invalidatePassword }])
        } else {
            Alert.alert('Success!',
                'User have been varified',
                [{ text: 'Okay', style: 'default', onPress: navigate }])

        }

    }

    return <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={styles.screenBackgorund}>

        <View style={styles.title}>
            <Text style={styles.textTitle}>Hello There!</Text>
            <Text style={styles.desc}>Welcome to React Native development tutorial!</Text>
        </View>

        <TextInput
            style={styles.textInput}
            onChangeText={usernameListener}
            value={userName}
            placeholder="Enter Username" />

        <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            onChangeText={passwordListener}
            value={password}
            placeholder="Password" />

        <View style={{ alignItems: 'flex-end', marginBottom: 25, marginTop: 15 }}>
            <Text style={styles.forgotPassword}>Recover Password</Text>
        </View>
        <AppButton onPress={onSigninPress}>Sign in</AppButton>

        <View style={styles.rowView}>
            <LinearGradient
                style={styles.line}
                colors={['#ffffff', '#988e9800']}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 1 }}
            />
            <Text style={styles.forgotPassword}>Or continue with</Text>
            <LinearGradient
                style={styles.line}
                colors={['#ffffff', '#988e9800']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
            />

        </View>

        <View style={styles.rowView}>
            <View style={styles.buttonContainer}>
                <Image source={require('../assets/google.png')} style={styles.imageButton} />
            </View>
            <View style={styles.buttonContainer}>
                <Image source={require('../assets/apple.png')} style={styles.imageButton} />
            </View>
            <View style={styles.buttonContainer}>
                <Image source={require('../assets/facebook.png')} style={styles.imageButton} />
            </View>
        </View>

        <Text style={styles.stepperLabel}>Not a member?
            <Text style={[styles.stepperLabel,
            { color: '#2020d0' }]}> Register now</Text></Text>

    </LinearGradient>
};

export default LoginScreen;

const styles = StyleSheet.create({
    title: {
        alignItems: "center",
        color: Colors.textColorLight
    },

    desc: {
        margin: 10,
        textAlign: 'center',
        color: Colors.textColorLight
    },

    rowView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30
    },

    forgotPassword: {
        textAlign: 'center',
        color: Colors.textColorLight,
        fontSize: 11
    },

    stepperLabel: {
        textAlign: 'center',
        color: Colors.textColorLight,
        fontSize: 11,
        margin: 10
    },

    textInput: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        marginTop: 20,
        elevation: 4,
        shadowRadius: 4,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3
    },

    line: {
        margin: 10,
        width: "30%",
        borderBottomWidth: 3,
    },

    textTitle: {
        margin: 10,
        padding: 10,
        fontSize: 24,
        color: Colors.textColorLight,
        alignItems: "center",
    },

    imageButton: {
        width: 24,
        height: 24,
    },

    buttonContainer: {
        paddingHorizontal: 22,
        paddingVertical: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: Colors.textColorLight,
        borderWidth: 1
    },

    screenBackgorund: {
        padding: 30,
        flex: 1,
        justifyContent: 'center'
    }
});