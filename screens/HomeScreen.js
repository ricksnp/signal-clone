import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView, TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from '../firebase';
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"

const HomeScreen = ({ navigation }) => {

    const [chats, setChats] = useState([]);

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login');
        })
    }

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => (
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))
        return unsubscribe;

    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroundColor: "#fff" },
            // Title of Header color
            headerTitleStyle: { color: "black" },
            // Any icons in the header are black
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name='camerao' size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("AddChat")}>
                        <SimpleLineIcons name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [])

    return (
        // SafeAreaView, in reference to an iPhone for example, makes
        // sure that no areas are cut off due to the border / shape of
        // an iphone
        <SafeAreaView>
            {/* Scrollable view */}
            <ScrollView style={styles.container}>
                {/* Remember to always have a key when rendering out via map */}
                {chats.map(({ id, data: { chatName } }) => (
                    <CustomListItem key={id} id={id} chatName={chatName} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: "100%"
    }
})
