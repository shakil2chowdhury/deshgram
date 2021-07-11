import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from './components/auth/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { useEffect } from 'react';
import { auth } from './firebase/config';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
import Main from './components/Main'
import Add from './components/main/Add';
import Save from './components/main/Save';

const store = createStore(rootReducer, applyMiddleware(thunk));
const Stack = createStackNavigator();


export default function App({navigation}) {
  const [loaded, setLoaded] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(!user){
        setLoggedIn(false)
        setLoaded(true)
      } else {
        setLoggedIn(true)
        setLoaded(true)
      }
    })
  }, [auth])
  return (
    <>
    { !loaded ? 
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>Loading...</Text>
      </View> 
      : !loggedIn ? 
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
      </NavigationContainer> : 
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={Main} options={{ headerShown: false }}/>
            <Stack.Screen name="Add" component={Add} navigation={navigation} />
            <Stack.Screen name="Save" component={Save} navigation={navigation} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    }
    </>
  );
}
