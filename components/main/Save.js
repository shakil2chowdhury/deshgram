import React from 'react';
import { useState } from 'react';
import { Text, View, TextInput, Image, Button } from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import { auth, firestore, storage, store } from '../../firebase/config';
import { fetchUser } from '../../redux/actions';

const Save = (props) => {
    const [caption, setCaption] = useState("")
    useEffect(() => {
        fetchUser()
    }, [fetchUser , props.currentUser])

    const uploadImage = async () => {

        const uri = props.route.params.image;

        const response = await fetch(uri);
        const blob = await response.blob();

        const ranNum = Math.floor(Math.random()*100000+1).toString(36);
        const childPath = `post/${auth.currentUser.uid}/${ranNum}`;

        const task = storage.ref().child(childPath).put(blob, { contentType: "image/png" })

        const taskProgress = snapshot => {
            console.log(`transferred ${snapshot.bytesTransferred}`)
        }
        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                saveImageData(snapshot)
            })
        }
        const taskError = snapshot => {
            console.log(snapshot)
        }
        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }
    const saveImageData = (downloadURL) => {
        firestore.collection('posts')
            .doc(auth.currentUser.uid)
            .collection('userPosts')
            .add({
                downloadURL,
                caption,
                creation: store.FieldValue.serverTimestamp(),
            })
            .then(() => {
                props.navigation.popToTop()
            })
    }
    return (
        <View style={{ flex: 1 }}>
            <Image source={{ uri: props.route.params.image }} />
            <TextInput
                placeholder="Write an awesome caption.."
                onChangeText={(caption) => setCaption(caption)}
            />
            <Button title="Save Now" onPress={() => uploadImage()} />
        </View>
    );
};

export default Save;