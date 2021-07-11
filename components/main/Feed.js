import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Text, Image, FlatList, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Feed = (props) => {
    const [posts, setPosts] = useState([])
    const [screenWidth, setScreenWidth] = useState(null);
    //liked comment share state
    const [liked, setLiked] = useState(false)
    //function for interactions
    const handleLike = () => {
        if(liked) setLiked(false)
        else setLiked(true)
    }

    const iconColor = liked ? '#CD113B' : '#868686'

    //for getting window width
    useEffect(() => {
        let width = Dimensions.get("window").width;
        setScreenWidth(width)
    }, [Dimensions])

    //dynamic image height
    const imageHeight = Math.floor(screenWidth * 1.1);

    useEffect(() => {
        if (props.usersFollowingLoaded == props.following.length && props.following.length !== 0) {
            props.feed.sort(function (x, y) {
                return x.creation - y.creation;
            })
            setPosts(props.feed);
        }
        console.log(posts)
    }, [props.usersFollowingLoaded, props.feed])
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={styles.logo}>Desh<Text style={{ color: "#2e86de" }}>Gram</Text></Text>
            </View>
            <FlatList
                numColumns={1}
                horizontal={false}
                data={posts}
                renderItem={({ item }) => {
                    return (
                        <>
                            <View style={styles.userBar} >
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Image
                                        style={styles.avatarStyle}
                                        source={{ uri: item.downloadURL }}
                                    />
                                    <Text style={{ marginLeft: 10 }}>{item.user.name}</Text>
                                </View>
                                <View style={{ alignItems: "center" }}>
                                    <Text style={{ fontSize: 30 }}>...</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                activeOpacity = {0.8}
                            >
                            <Image
                                style={{ width: screenWidth, height: imageHeight }}
                                source={{ uri: item.downloadURL }}
                            />
                            </TouchableOpacity>
                            <View style={styles.iconBar}>
                                <TouchableOpacity
                                    onPress={handleLike}
                                >
                                    <MaterialCommunityIcons style={styles.icon} name="heart-outline" color={iconColor} size={30} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    
                                >
                                    <MaterialCommunityIcons style={styles.icon} name="comment-outline" color={"#868686"} size={30} />
                                </TouchableOpacity>
                                
                                <MaterialCommunityIcons style={styles.icon} name="send-outline" color={"#868686"} size={30} />
                            </View>
                            <View style={styles.commentBar}>
                                <MaterialCommunityIcons style={styles.icon} name="heart" color={iconColor} size={20} />
                                <Text style={{ marginLeft: 5, color: '#444444', fontSize: 12 }}>{liked ?<>1200 Likes</> : <>1199 Likes</>}</Text>
                            </View>
                        </>
                    )
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 100 + "%",
        width: 100 + "%",
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
    userBar: {
        width: 100 + "%",
        height: 50,
        backgroundColor: "rgb(255,255,255)",
        flexDirection: "row",
        paddingHorizontal: 10,
        justifyContent: "space-between",
    },
    avatarStyle: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    iconBar: {
        height: 40,
        width: 100 + "%",
        borderColor: "rgb(233,233,233)",
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center"
    },
    commentBar: {
        height: 40,
        width: 100 + "%",
        borderColor: "rgb(233,233,233)",
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgb(252, 250, 252)"
    },
    icon: {
        marginLeft: 10,
    },
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    feed: store.usersState.feed,
    usersFollowingLoaded: store.usersState.usersFollowingLoaded,
})

export default connect(mapStateToProps, null)(Feed);