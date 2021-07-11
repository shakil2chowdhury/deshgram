import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Text, Image, FlatList, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { auth, firestore } from '../../firebase/config';
import { fetchUserFollowing } from '../../redux/actions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Profile = (props) => {

    const [userPosts, setUserPosts] = useState([])
    const [user, setUser] = useState(null)
    const [following, setFollowing] = useState(false)

    useEffect(() => {
        fetchUserFollowing();
        const { currentUser, posts } = props;
        if (props.route.params.uid === auth.currentUser.uid) {
            setUser(currentUser)
            setUserPosts(posts)
        } else {
            firestore.collection("users").doc(props.route.params.uid).get()
                .then((snapShot) => {
                    if (snapShot.exists) {
                        setUser(snapShot.data());
                    } else {
                        console.log('does not exists')
                    }
                })
            firestore.collection("posts").doc(props.route.params.uid).collection("userPosts").orderBy("creation", "asc").get()
                .then((snapShot) => {
                    let posts = snapShot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    setUserPosts(posts)
                })
        }
        if (props.following.indexOf(props.route.params.uid) > -1) {
            setFollowing(true)
        } else {
            setFollowing(false)
        }
    }, [props.route.params.uid, props.following, props.fetchUserFollowing])

    const onFollow = () => {
        console.log('onFollow clicked')
        firestore.collection("following").doc(auth.currentUser.uid).collection("userFollowing")
            .doc(props.route.params.uid)
            .set({})
        setFollowing(true)
    }

    const onUnfollow = () => {
        firestore.collection("following").doc(auth.currentUser.uid).collection("userFollowing")
            .doc(props.route.params.uid)
            .delete()
        setFollowing(false)
    }

    //log out function
    const onLogout = () => {
        auth.signOut()
    }

    if (user === null) {
        return <View />
    }
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={styles.logo}>Desh<Text style={{ color: "#2e86de" }}>Gram</Text></Text>
            </View>
            <View style={styles.infoContainer}>
                <Image style={styles.avatarStyle} source={{ uri: "https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg" }} />
                <Text style={styles.name}>{user?.name}</Text>
                <Text>{user?.email}</Text>
            </View>
            {props.route.params.id !== auth.currentUser.uid ?
                <View style={styles.buttonContainer}>
                    {following ? (
                        <TouchableOpacity
                            style={styles.roundedButton}
                            onPress={() => onUnfollow()}
                        >
                            <Text style={styles.buttonText}>Following</Text>
                        </TouchableOpacity>
                    ) :
                        (
                            <TouchableOpacity
                                style={styles.roundedButton}
                                onPress={() => onFollow()}
                            >
                                <Text style={styles.buttonText}>Follow</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
                :
                <TouchableOpacity
                    style={styles.roundedButton}
                    onPress={() => onLogout()}
                >
                    <Text style={styles.buttonText}>Sign Out</Text>
                </TouchableOpacity>
            }
            <View style={styles.galleryContainer}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={userPosts}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.imageContainer}>
                                <Image
                                    style={styles.imageStyle}
                                    source={{ uri: item.downloadURL }}
                                />
                            </View>
                        )
                    }}
                />
            </View>
            <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity
                    style={styles.signOut}
                    onPress={() => onLogout()}
                >
                    <MaterialCommunityIcons style={styles.icon} name="logout-variant" color="white" size={30} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    infoContainer: {
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    galleryContainer: {
        flex: 1
    },
    imageStyle: {
        flex: 1,
        aspectRatio: 1 / 1,
    },
    imageContainer: {
        flex: 1 / 3,
    },
    logoContainer: {
        width: 100 + "%",
        height: 56,
        marginTop: 35,
        backgroundColor: "rgb(250,250,250)",
        borderBottomColor: "rgb(233,233,233)",
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        fontSize: 24,
        fontStyle: "italic",
        fontFamily: 'Roboto',
    },
    name: {
        fontSize: 24,
        fontStyle: "italic",
        fontFamily: 'Roboto',
    },
    avatarStyle: {
        width: 90,
        height: 100,
        borderRadius: 20,
    },
    roundedButton: {
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#2e86de',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    buttonText: {
        fontSize: 14,
        fontFamily: 'Roboto',
        color: 'white'
    },
    signOut: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#2e86de',
        marginRight: 20,
        marginBottom: 10
    }

})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
    following: store.userState.following
})

export default connect(mapStateToProps, null)(Profile);