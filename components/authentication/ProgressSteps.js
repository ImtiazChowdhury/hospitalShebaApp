import React from "react"
import { Text, View, TouchableOpacity } from "react-native"

export const ProgressSteps = (props) => {
    return (
        <View style={barStyle}>

            <TouchableOpacity
                // onPress={() => props.navigation.navigate("InitiateOTP")} 
                {...props}>
                <Text style={props.stage >= 1 ? filledTextStyle : blankTextStyle}>1</Text>
            </TouchableOpacity>

            <View style={props.stage >= 2 ? filledViewStyle : blankViewStyle}></View>

            <TouchableOpacity
                // onPress={() => props.navigation.navigate("VerifyOTP", { OTP: props.OTP })} 
                {...props}>
                <Text style={props.stage >= 2 ? filledTextStyle : blankTextStyle}>2</Text>
            </TouchableOpacity>

            <View style={props.stage >= 3 ? filledViewStyle : blankViewStyle}></View>

            <TouchableOpacity
                // onPress={() => props.navigation.navigate("SetInformation", { authToken: props.authToken })} 
                {...props}>
                <Text style={props.stage >= 3 ? filledTextStyle : blankTextStyle}>3</Text>
            </TouchableOpacity>

        </View>
    )
}
export default ProgressSteps


const baseTextStyle = {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    padding: 5,
    borderRadius: 50,
    width: 35,
    height: 35,
    textAlign: "center",
}

const filledTextStyle = {
    ...baseTextStyle,
    backgroundColor: "#359d9e"
}

const blankTextStyle = {
    ...baseTextStyle,
    backgroundColor: "#b2b2b2"

}

const baseViewStyle = {
    flex: 1,
    height: 5,
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
    paddingTop: 20,
}
