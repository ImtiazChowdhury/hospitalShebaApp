import React from "react"
import { ActivityIndicator } from "react-native-paper"
import { Dimensions, StyleSheet, View } from "react-native"


export const OverlayActivityIndicator = (props) => {

  return (
    <View style={style.container}>
      <ActivityIndicator color="#359d9e" style={{ position: "relative" }} size="large"/>
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