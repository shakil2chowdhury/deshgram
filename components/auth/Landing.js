import React from 'react';
import { Button, View } from 'react-native';

export default function Landing({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Button
                title='register'
                onPress={() => navigation.navigate('Register')}
            />
            <Button
                title='login'
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    )
}