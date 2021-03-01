import React,{useState, useEffect} from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import Icon from "react-native-vector-icons/Ionicons"
import { View, Text, SafeAreaView, StyleSheet } from "react-native"
import HomeLayout from "./HomeLayout"
import ServicesLayout from "./ServicesLayout"
import isAuthenticated from "../lib/isAuthenticated"
import AuthenticationLayout from "./Authentication"
import DiscountLayout from "./DiscountLayout"

export const TabLayout = (props) => {

    const tab = createBottomTabNavigator()
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        (async function () {
            if (await isAuthenticated()) {
                setAuthenticated(true)
            } else {
                setAuthenticated(false)
            }
        })()
    })

    return (


        <tab.Navigator initialRouteName="Home" screenOptions={({ route }) => {
            return {
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName
                    if (route.name == "Home") {
                        iconName = focused ? "home" : "home-outline"
                    }
                    if (route.name == "Discount") {
                        iconName = focused ? "qr-code" : "qr-code-outline"
                        return (
                            <View style={style.discountTab}>
                                <Icon name={iconName} size={35} color="#359d9e" style={style.discountIcon} />
                                <Text style={style.discountLabel} >Discount</Text>
                            </View>
                        )
                    }
                    if (route.name == "Services") {
                        iconName = focused ? "medkit" : "medkit-outline"
                    }
                    return <Icon name={iconName} size={24} color="#fff" />
                },

                cardStyle: { backgroundColor: "#fff" }
            }
        }} tabBarOptions={{
            activeTintColor: "#fff",
            inactiveTintColor: "#fff",
            activeBackgroundColor: "#359d9e",
            inactiveBackgroundColor: "#359d9e",
            labelStyle: {
                fontSize: 12,
                // marginBottom: 
            },
            tabStyle: {
                // height: 50
                padding: 5
            }
        }} >
            <tab.Screen name="Home" component={HomeLayout} />
            <tab.Screen name="Discount" component={authenticated?DiscountLayout:AuthenticationLayout} options={{
                title: () => <></>,

            }} />
            <tab.Screen name="Services" component={ServicesLayout} />
        </tab.Navigator>
    )
}

export default TabLayout

const style = StyleSheet.create({
    discountTab: {
        position: 'absolute',
        bottom: 10, // space from bottombar
        paddingTop: 10,
        height: 68,
        width: 68,
        backgroundColor: '#359d9e',
        // justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 100,
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
    },
    discountLabel: {
        color: "#fff",
        // marginTop: 5,
        marginBottom: 5,
        // fontWeight: "bold"
    },
    discountIcon: {
        padding: 5,
        backgroundColor: "#fff",
        borderRadius: 50
    }
})