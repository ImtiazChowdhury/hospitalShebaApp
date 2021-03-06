import React from "react"
import {  } from "react-native-paper"
import { Dimensions, StyleSheet, View, ActivityIndicator } from "react-native"


export const OverlayActivityIndicator = (props) => {

  return (
    <View style={[style.container, {backgroundColor: props.dropColor || "#fff4"}]}>
      <ActivityIndicator color="#359d9e" style={[{ position: "relative" }]} size={30}/>
    </View>
  )
}
export default OverlayActivityIndicator;

const style = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 80,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 100,
    backgroundColor: "#fff4"
  }
})