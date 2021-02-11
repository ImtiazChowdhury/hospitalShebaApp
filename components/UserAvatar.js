import React, { useState, useEffect } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import AsyncStorage from '@react-native-async-storage/async-storage'

export const UserAvatar = (props) => {

  const [isAuthenticated, setIsAuthenticated] = useState(true)

  useEffect(() => {
    (async () => {
      const authToken = await AsyncStorage.getItem("authToken")
      if (authToken) setIsAuthenticated(true)
      else setIsAuthenticated(false)
    })()
  })

  function navigate() {
    if (isAuthenticated) {
      props.navigation.navigate("Authentication", { screen: "Profile" })
    } else {
      props.navigation.navigate("Authentication", { screen: "InitiateOTP" })
    }
  }
  return (
    <TouchableOpacity onPress={navigate}>
      <Icon name="person-sharp" size={24} style={style.personIcon} color="#369d9e" />
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  personIcon: {}
})