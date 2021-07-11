import React from 'react';
import { useState } from 'react';
import { Text, TextInput, View, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { firestore } from '../../firebase/config';

const Search = (props) => {
    const [users, setUsers] = useState([])

    const fetchUsers = (search) => {
        firestore.collection('users')
            .where('name', '>=', search)
            .get()
            .then((snapshot) => {
                let users = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                setUsers(users)
            })
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            height: 100 + "%",
            width: 100 + "%",
        },
        box: {
            backgroundColor: '#2e86de',
            padding: 20,
            borderRadius: 30,
            marginTop: 5,
            marginHorizontal: 20,
            flexDirection: "row"
        },
        text: {
            color: 'white',
            fontSize: 20,
            alignItems: 'center'
        },
        input: {
            height: 50,
            margin: 24,
            borderWidth: 1,
            padding: 15,
            borderColor: '#2e86de',
            borderRadius: 8
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
        avatarStyle: {
            width: 90,
            height: 100,
            borderRadius: 20,
        },
    });
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={styles.logo}>Desh<Text style={{ color: "#2e86de" }}>Gram</Text></Text>
            </View>
            <TextInput style={styles.input} placeholder="Type Here.." onChangeText={(search) => fetchUsers(search)} />
            <FlatList
                numColumns={1}
                horizontal={false}
                data={users}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.box} onPress={() => props.navigation.navigate("Profile", { uid: item.id })}>
                            <Image style={styles.avatarStyle} source={{ uri: "https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg" }} />
                            <View style={{ marginLeft: 10, justifyContent: 'center', marginBottom: 10}}>
                                <Text style={styles.text}>{item.name}</Text>
                                <Text style={styles.text}>{item.email}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    );
};



export default Search;