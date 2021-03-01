import React, { useEffect, useState } from "react"
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { HelperText, Snackbar } from "react-native-paper"
import ProgressSteps from "../../components/authentication/ProgressSteps"
import OverlayActivityIndicator from "../../components/OverlayActivityIndicator"
import { baseUrl } from "../../config.json"
import AsyncStorage from '@react-native-async-storage/async-storage'

export const VerifyOTP = (props) => {

    const [verificationCode, setVerificationCOde] = useState("")
    const [loading, setLoading] = useState(false)
    const [inputError, setInputError] = useState({})
    const [infoBarVisible, setInfoBarVisible] = useState(false)
    const [infoBarText, setInfoBarText] = useState("")
    const [OTPId, setOTPId] = useState("")
    const [resentOTP, setResentOTP] = useState(false)
    const [authToken, setAuthToken] = useState("") //for progressBar

    function handleSubmit(e) {
        RequestVerifyOTP()
    }

    useEffect(() => {
        if (!props.route || !props.route.params || !props.route.params.OTP) {
            props.navigation.goBack()
        } else {
            setOTPId(props.route.params.OTP._id)
        }
    }, [props])


    async function RequestVerifyOTP() {
        try {
            setLoading(true)

            const response = await fetch(baseUrl + '/api/register/verify', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: OTPId,
                    verificationCode
                })

            })

            if (response.ok) {
                const OTP = await response.json()
                setInputError({})

                //signed in
                try {
                    AsyncStorage.setItem("authToken", OTP.authToken);
                    props.navigation.navigate("SetInformation", {authToken: OTP.authToken})
                    setAuthToken(OTP.authToken)
                }catch(err){
                    setInfoBarVisible(true);
                    setInfoBarText("Could not Store authentication data ")
                }
                
            } else {
                if (response.status >= 400 && response.status < 500) {
                    const errorList = await response.json();
                    console.log(errorList);
                    setInputError(errorList)
                } else if (response.status >= 500 && response.status < 600) {
                    setInfoBarText("Could not process request!")
                    setInfoBarVisible(true)
                }
            }
            setLoading(false)

        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    async function requestResend() {
        try {
            setLoading(true)

            const response = await fetch(baseUrl + '/api/register/initiate', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ phone: props.route.params.OTP.phone })
            })

            if (response.ok) {
                const OTP = await response.json()
                setInputError({})
                setOTPId(OTP[0] && OTP[0]._id)
                setResentOTP(true)

            } else {
                if (response.status >= 400 && response.status < 500) {
                    setInputError(await response.json())
                } else if (response.status >= 500 && response.status < 600) {
                    setInfoBarText("Could not process request!")
                    setInfoBarVisible(true)
                }
            }
            setLoading(false)

        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }


    return (
        <>

            <Snackbar visible={infoBarVisible} onDismiss={() => { setInfoBarVisible(false) }}
                style={{ marginBottom: 35 }}
            action={{ label: 'Ok', onPress: () =>{ setInfoBarVisible(false)}}}
            >
                {infoBarText}
            </Snackbar>

            {loading && <OverlayActivityIndicator />}
            <ScrollView style={style.body}>
                <ProgressSteps stage={2} {...props} authToken={authToken}/>

                <View style={style.headerContainer}>
                    <Text style={style.heading}>Enter Code</Text>

                </View>

                <View style={style.imageContainer}>
                    <Image style={style.image} source={require("../../assets/enterOTP1.jpg")} />
                </View>

                <Text style={style.subText}>
                    Enter the 6 digit code we sent to {props.route?.params?.OTP?.phone}
                </Text>

                {!resentOTP &&
                    <View style={style.resendTextContainer}>
                        <Text style={style.resendText}>
                            Didn't receive any code?
                    </Text>
                        <TouchableOpacity onPress={requestResend}>
                            <Text style={style.link}> Resend</Text>
                        </TouchableOpacity>
                    </View>
                }
                {resentOTP &&
                    <View style={style.resendTextContainer}>
                        <Text style={style.resendText}>
                            OTP was sent to your phone
                        </Text>
                    </View>
                }

                <View style={style.phoneNumberInputContainer}>

                    <TextInput style={style.phoneNumberInput} value={verificationCode}
                        onChangeText={text => setVerificationCOde(text)}
                        placeholder="######" maxLength={6}
                        keyboardType="numeric"
                    />
                    <HelperText type="error" visible={inputError.verificationCode ? true : false} padding="none">
                        {inputError.verificationCode}
                    </HelperText>
                </View>

                <View style={style.submitButtonContainer}>
                    <TouchableOpacity onPress={handleSubmit}>
                        <Text style={style.submitButton}>VERIFY</Text>
                    </TouchableOpacity>
                </View>


                <View style={style.infoTextContainer}>
                    <Text style={style.infoText}>
                        Already have an account?
                </Text>
                <TouchableOpacity onPress={()=>props.navigation.navigate("Login")}>
                        <Text style={style.link}> Log In</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </>
    )
}

export default VerifyOTP

const style = StyleSheet.create({
    body: {
        width: "100%",
        paddingLeft: "5%",
        paddingRight: "5%",
    },
    imageContainer: {
        width: "80%",
        height: 200,
        marginTop: 20,
        marginLeft: "10%"
    },
    image: {
        width: "100%",
        height: "100%"
    },

    heading: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        color: "#359d9e",
        fontFamily: "serif",
    },
    subText: {
        textAlign: "center",
        color: "#a1a1a1",
        marginTop: 5,
        fontSize: 12
    },
    headerContainer: {
        marginTop: 10,
    },
    phoneNumberInput: {
        fontSize: 25,
        borderRadius: 4,
        padding: 5,
        borderColor: "#359d9e",
        borderWidth: 1.5,
        letterSpacing: 35,
        color: "#5d5d5d"
    },
    phoneNumberInputContainer: {
        marginTop: 20,
        marginBottom: 10,
    },
    phoneError: {
        marginLeft: 0
    },
    agreeTextView: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: 50

    },
    textStart: {
        textAlign: "justify"
    },
    pageLink: {
        color: "#d0d0d0",
        textDecorationLine: "underline"
    },
    submitButton: {
        fontWeight: "normal",
        fontSize: 20,
        backgroundColor: "#359d9e",
        borderRadius: 5,
        color: "#fff",
        textAlign: "center",
        padding: 5
    },
    submitButtonContainer: {
        marginTop: 0
    },
    textCenter: {
        textAlign: "center"
    },

    infoText: {
        color: "#359d9e",
        textAlign: "center"
    },
    link: {
        color: "#359d9e",
        fontWeight: "bold"
    },
    infoTextContainer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
    },
    resendTextContainer: {
        marginTop: 0,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "center",
    },
    resendText: {
        color: "#5d5d5d"
    }
})