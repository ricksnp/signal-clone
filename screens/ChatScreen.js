import React, { useLayoutEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons"

// We also get route as a parameter, which gives us access to props along the way
const ChatScreen = ({ navigation, route }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerTitleAlign: "left",
            headerBackTitleVisible: false,
            headerTitle: () => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Avatar rounded source={{ uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png" }} />
                    <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>{route.params.chatName}</Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
            )
        })
    }, [navigation])
    return (
        <View>
            <Text>I am Chat Screen</Text>
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({})
