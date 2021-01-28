import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native";
import Discount from "../screens/discount/Discount";
import Icon from "react-native-vector-icons/Ionicons"
import { View, Text } from "react-native";
import HomeLayout from "./HomeLayout";
import ServicesLayout from "./ServicesLayout";

export const TabLayout = (props) => {

    const tab = createBottomTabNavigator();

    return (
        <NavigationContainer>

            <tab.Navigator initialRouteName="Home" screenOptions={({ route }) => {
                return {
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name == "Home") {
                            iconName = focused ? "home" : "home-outline"
                        }
                        if (route.name == "Discount") {
                            iconName = focused ? "qr-code" : "qr-code-outline";
                            return (
                                <View style={style.discountTab}>
                                    <Icon name={iconName} size={25} color="#fff" />
                                    <Text style={style.discountLabel} >Discount</Text>
                                </View>
                            )
                        }
                        if (route.name == "Services") {
                            iconName = focused ? "medkit" : "medkit-outline"
                        }
                        return <Icon name={iconName} size={30} color="#fff" />
                    },

                    cardStyle: { backgroundColor: "#fff" }
                }
            }} tabBarOptions={{
                activeTintColor: "#fff",
                inactiveTintColor: "#fff",
                activeBackgroundColor: "#359d9e",
                inactiveBackgroundColor: "#359d9e",
                labelStyle: {
                    fontSize: 14,
                    marginBottom: 2
                },
                tabStyle: {
                }
            }} >
                <tab.Screen name="Home" component={HomeLayout} />
                <tab.Screen name="Discount" component={Discount} options={{
                    title: "",

                }} />
                <tab.Screen name="Services" component={ServicesLayout} />
            </tab.Navigator>
        </NavigationContainer>
    )
}

export default TabLayout;

const style = {
    discountTab: {
        position: 'absolute',
        bottom: 10, // space from bottombar
        paddingTop: 10,
        height: 58,
        width: 58,
        backgroundColor: '#359d9e',
        // justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 29,
        borderTopLeftRadius: 29,
        borderBottomLeftRadius: 29,
        borderBottomRightRadius: 29,
    },
    discountLabel: {
        color: "#fff",
        marginTop: 10,
        marginBottom: 5,
        fontWeight: "bold"
    }
}