import React from "react";
import { Text, View } from "react-native";

export const ProgressSteps = (props) => {
    return (
        <View style={barStyle}>

            <Text style={props.stage >= 1 ? filledTextStyle : blankTextStyle}>1</Text>
            <View style={props.stage >= 2 ? filledViewStyle : blankViewStyle}></View>
            <Text style={props.stage >= 2 ? filledTextStyle : blankTextStyle}>2</Text>
            <View style={props.stage >= 3 ? filledViewStyle : blankViewStyle}></View>
            <Text style={props.stage >= 3 ? filledTextStyle : blankTextStyle}>3</Text>

        </View>
    )
}
export default ProgressSteps;


const baseTextStyle = {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 22,
    padding: 5,
    borderRadius: "50%",
    width: 40,
    height: 40,
    textAlign: "center",
    alignContent: "",
}

const filledTextStyle = {
    ...baseTextStyle,
    backgroundColor: "#359d9e"
}
console.log(filledTextStyle)

const blankTextStyle = {
    ...baseTextStyle,
    backgroundColor: "#b2b2b2"

}

const baseViewStyle = {
    flex: 1,
    height: 5
}


const filledViewStyle = {
    ...baseViewStyle,
    backgroundColor: "#359d9e"
}

const blankViewStyle = {
    ...baseViewStyle,
    backgroundColor: "#b2b2b2"
}

const barStyle = { 
    flexDirection: "row", 
    flex: 1, 
    alignItems: "center",
    paddingTop: 40
}
