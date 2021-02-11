import React from "react"
import { ActivityIndicator } from "react-native-paper"
import { StyleSheet, View } from "react-native"


export const RelativeActivityIndicator = (props) => {

  return (
    <View style={style.container}>
      <ActivityIndicator color="#369d9e" style={{ position: "relative" }} />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    //   flex:1,
    //   justifyContent:"center",
    //   width:"100%",
    // height: 100,
    padding: 10
    //   position:"relative"
  }
})