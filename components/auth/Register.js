import React from 'react';
import { Button, TextInput, View } from 'react-native';
import { auth, firestore } from '../../firebase/config';
import { useState } from 'react';
require('firebase/auth')

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
            firestore.collection('users').doc(auth.currentUser.uid)
            .set({
                name,
                email,
            })
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    return (
        <View>
            <TextInput
                placeholder="Full Name"
                onChangeText={(name) => setName(name)}
            />
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
                onPress={() => handleSignUp()}
                title='Sign Up'
            />
        </View>
    );
};

export default Register;