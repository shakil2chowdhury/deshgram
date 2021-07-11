import React from 'react';
import { Button, TextInput, View } from 'react-native';
import { auth } from '../../firebase/config';
import { useState } from 'react';
require('firebase/auth')

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignIn = () => {
        auth.signInWithEmailAndPassword(email, password)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    return (
        <View>
            <TextInput
                placeholder="Email"
                onChangeText={(email) => setEmail(email)}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
            />
            <Button 
                onPress={() => handleSignIn()}
                title='Sign In'
            />
        </View>
    );
};

export default Login;