import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, fetchUserPosts, fetchUserFollowing, clearData } from '../redux/actions';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feed from './main/Feed';
import Profile from './main/Profile';
import Search from './main/Search';
import { auth } from '../firebase/config';

const Tab = createMaterialBottomTabNavigator();
const EmptyScreen = () => {
    return (null);
}

const Main = ({ fetchUser, fetchUserPosts, fetchUserFollowing, navigation }) => {
    useEffect(() => {
        fetchUser()
        fetchUserPosts()
        fetchUserFollowing()
        clearData()
    }, [fetchUser, fetchUserPosts, fetchUserFollowing, clearData])
    return (
        <Tab.Navigator initialRouteName="Feed">
            <Tab.Screen
                name="Feed"
                component={Feed}
                options={{
                    tabBarLabel: 'Feed',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                navigation={navigation}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="magnify" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="Add Container"
                component={EmptyScreen}
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("Add")
                    }
                })}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="plus-box" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("Profile", { uid: auth.currentUser.uid })
                    }
                })}
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={24} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, fetchUserPosts, fetchUserFollowing, clearData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);