import * as React from 'react'
import { Button, Image, View, StyleSheet, TouchableOpacity, Text, Linking } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import Home from '../screens/Home/Home'
import HomeLayout from './HomeLayout'
import ServicesLayout from './ServicesLayout'
import TabLayout from './TabLayout'
import AuthenticationLayout from './Authentication'
import Logo from "../assets/logo.png"
import { Divider } from "react-native-paper"
import Icon from 'react-native-vector-icons/MaterialIcons'
import DiscountLayout from './DiscountLayout'
import { ScrollView } from 'react-native-gesture-handler'


export const DrawerLayout = () => {
  const Drawer = createDrawerNavigator()
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerStyle={{ width: '80%', padding: 0, backgroundColor: '#359d9e', color: "#fff" }}
        drawerContent={(props) => <DrawerHeader {...props} />}
      >

        <Drawer.Screen name="Tab" component={TabLayout} options={{ title: "Home" }} />
        <Drawer.Screen name="Services" component={ServicesLayout} />
        <Drawer.Screen name="Profile" component={AuthenticationLayout} />
        <Drawer.Screen name="Discount" component={DiscountLayout} />

      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default DrawerLayout

const DrawerHeader = (props) => {

  return (
    <ScrollView>
      <View style={style.headerView}>
        <View style={style.headerImageView}>

          <Image source={Logo} style={style.headerImage} />
        </View>
      </View>

      <View style={style.linkView}>

        <TouchableOpacity style={style.linkTouch}
          onPress={() => props.navigation.navigate("Tab", { screen: "Home" })}
        >
          <Icon style={style.icon} name="home" size={20} />
          <Text style={style.link}>Home</Text>
        </TouchableOpacity>


        <TouchableOpacity style={style.linkTouch}
          onPress={() => props.navigation.navigate("Tab", { screen: "Discount" })}
        >
          <Icon style={style.icon} name="qr-code" size={20} />
          <Text style={style.link}>Get Discount</Text>
        </TouchableOpacity>


        <TouchableOpacity style={style.linkTouch}
          onPress={() => props.navigation.navigate("Tab", { screen: "Services" })}
        >
          <Icon style={style.icon} name="category" size={20} />
          <Text style={style.link}>All Services</Text>
        </TouchableOpacity>


        <TouchableOpacity style={style.linkTouch}
          onPress={() => props.navigation.navigate("Tab", { screen: "Services", params: { screen: "HospitalList" } })}
        >
          <Icon style={style.icon} name="business" size={20} />
          <Text style={style.link}>Hospitals</Text>
        </TouchableOpacity>



        <TouchableOpacity style={style.linkTouch}
          onPress={() => props.navigation.navigate("Tab", { screen: "Services", params: { screen: "DoctorList" } })}
        >
          <Icon style={style.icon} name="groups" size={20} />
          <Text style={style.link}>Doctors</Text>
        </TouchableOpacity>



        <TouchableOpacity style={style.linkTouch}
          onPress={() => props.navigation.navigate("Tab", { screen: "Services", params: { screen: "TestList" } })}
        >
          <Icon style={style.icon} name="medical-services" size={20} />
          <Text style={style.link}>Diagnostic</Text>
        </TouchableOpacity>


        <TouchableOpacity style={style.linkTouch}
          onPress={() => props.navigation.navigate("Tab", { screen: "Home", params: { screen: "Authentication", params: { screen: "BillList" } } })}
        >
          <Icon style={style.icon} name="payments" size={20} />
          <Text style={style.link}>Bill History</Text>
        </TouchableOpacity>



        <TouchableOpacity style={style.linkTouch}
          onPress={() => props.navigation.navigate("Tab", { screen: "Home", params: { screen: "Authentication", params: { screen: "Profile" } } })}
        >
          <Icon style={style.icon} name="person" size={20} />
          <Text style={style.link}>My Account</Text>
        </TouchableOpacity>




        <TouchableOpacity style={style.hotline}
          onPress={() => Linking.openURL(`tel:+880 1841 082727`)}
        >
          <Icon style={style.icon} name="call" size={20} />
          <Text style={style.link}>+880 1841 082727</Text>

        </TouchableOpacity>
        <Text style={style.miniText}>Hospital Sheba Hotline</Text>

      </View>
    </ScrollView>
  )
}

const style = StyleSheet.create({
  headerImage: {
    height: 120,
    width: 120,
  },
  headerImageView: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  headerView: {
    height: 200,
    width: "100%",
    alignItems: "center",
    paddingTop: 40,
    borderBottomWidth: 1,
    borderColor: "#fff7",
  },
  linkView: {
    alignItems: "flex-start"
  },
  linkTouch: {
    flexDirection: "row",
    padding: 5,
    marginTop: 10,
    paddingLeft: 20,
  },
  link: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "normal",
    fontFamily: "serif"
  },
  icon: {
    color: "#fff",
    marginRight: 5,
    marginTop: 4
  },
  drawerLink: {
    color: "#fff"
  },
  hotline: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 5,
    marginTop: 40,
    // paddingLeft: 20,
    // alignContent:"center",
    // alignItems:"center",
    justifyContent:"center",
    width: "70%",
    alignSelf: "center",
    borderColor: "#fffc",
    borderRadius: 5,
    borderWidth: 1,
  },
  miniText:{
    color: "#eeee",
    textAlign:"center",
    alignSelf:"center",
    fontSize: 11,
    fontFamily:"serif",
    marginTop: -10,
    backgroundColor: "#359d9e",
    paddingLeft: 2,
    paddingRight: 2,
    // marginRight: -120
  }
})