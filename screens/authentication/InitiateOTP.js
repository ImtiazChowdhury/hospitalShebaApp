import React, { useEffect, useState } from "react";
import { Button, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import ProgressSteps from "../../components/authentication/ProgressSteps";

export const InitiateOTP = (props) => {

    const [phone, setPhone] = useState("");
    
    function handleOnchange(e) {
        setPhone(e.target.value);
    }
    
    function handleSubmit(e){
        
    }

    return (
        <View style={style.body}>
            <ProgressSteps stage={2} />

            <View style={style.imageContainer}>
                <Image style={style.image} source={require("../../assets/registration.png")} />
            </View>

            <View style={style.headerContainer}>
                <Text style={style.heading}>Register Phone Number</Text>
                <Text style={style.subText}>Enter your phone number to register new account
                    and get OTP through SMS</Text>
            </View>

            <View style={style.phoneNumberInputContainer}>

                <TextInput style={style.phoneNumberInput} value={phone} onChange={handleOnchange}
                    placeholder="01***********" maxLength={11}
                />

            </View>


            <Text style={{ ...style.subText, ...style.textStart }} >
                By registering you are agreeing to our
                    <TouchableOpacity style={style.pageLink}>Terms of Service</TouchableOpacity> and
                    <TouchableOpacity style={style.pageLink}> Privacy Policy</TouchableOpacity>
            </Text>

            <View style={style.submitButtonContainer}>
                <TouchableOpacity style={style.submitButton} onPress={handleSubmit}>
                    Register
                </TouchableOpacity>
            </View>

            <View style={style.infoTextContainer}>
                <Text style={style.infoText}>
                    Already have an account?
                    <TouchableOpacity style={style.link}>
                        Log In
                    </TouchableOpacity>
                </Text>
            </View>

        </View>
    )
}

export default InitiateOTP

const style = {
    body: {
        width: "100%",
        paddingLeft: "10%",
        paddingRight: "10%"
    },
    imageContainer: {
        width: "100%",
        height: 200,
        marginTop: 50
    },
    image: {
        width: "100%",
        height: "100%"
    },

    heading: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        color: "#5d5d5d",
        // fontFamily: "Nunito-Regular"
    },
    subText: {
        textAlign: "center",
        color: "#d0d0d0",
        marginTop: 5,

    },
    headerContainer: {
        marginTop: 20,
    },
    phoneNumberInput: {
        fontSize: "6.5vw",
        borderRadius: 5,
        padding: 10,
        borderColor: "#ebebeb",
        borderWidth: 1,
        letterSpacing: "3.1vw"
    },
    phoneNumberInputContainer: {
        marginTop: 40,
    },
    textStart: {
        textAlign: "justify"
    },
    pageLink: {
        textDecoration: "underline"
    },
    submitButton: {
        fontWeight: "bold",
        fontSize: 25,
        backgroundColor: "#359d9e",
        borderRadius: 8,
        color: "#fff",
        textAlign: "center",
        padding: 10
    },
    submitButtonContainer: {
        marginTop: 20
    },
    textCenter:{
        textAlign: "center"
    },

    infoText:{
        color: "#359d9e",
        textAlign: "center"
    },
    link:{
        color: "#359d9e",
        fontWeight: "bold"
    },
    infoTextContainer:{
        marginTop:20,
    }
}