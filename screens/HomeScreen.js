import React, { useLayoutEffect } from 'react'
import { SafeAreaView, TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from '../firebase';
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"

const HomeScreen = ({ navigation }) => {
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login');
        })
    }

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
            <ScrollView>
                <CustomListItem />
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
