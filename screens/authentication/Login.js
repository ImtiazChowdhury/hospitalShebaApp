import React, { useEffect, useState, useRef } from "react"
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { HelperText, Snackbar } from "react-native-paper"
import ProgressSteps from "../../components/authentication/ProgressSteps"
import OverlayActivityIndicator from "../../components/OverlayActivityIndicator"
import { baseUrl } from "../../config.json"
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from "react-native-vector-icons/Ionicons"

export const Login = (props) => {

    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false)
    const [inputError, setInputError] = useState({})
    const [infoBarVisible, setInfoBarVisible] = useState(false)
    const [infoBarText, setInfoBarText] = useState("")


    const phoneRef = useRef(null);
    const passRef = useRef(null);

    useEffect(() => {
        phoneRef?.current?.focus()
    }, [])

    function handleSubmit(e) {
        RequestVerifyOTP()
    }

    useEffect(() => {
        if (!props.route || !props.route.params || !props.route.params.authToken) {
            // props.navigation.goBack()
        }
    }, [props])


    async function RequestVerifyOTP() {
        try {
            setLoading(true)

            const response = await fetch(baseUrl + '/api/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ phone, password })

            })

            if (response.ok) {
                const OTP = await response.json()
                setInputError({})

                //signed in
                try {
                    AsyncStorage.setItem("authToken", OTP.authToken)
                    props.navigation.push("Profile")
                } catch (err) {
                    setInfoBarVisible(true)
                    setInfoBarText("Could not Store authentication data ")
                }

            } else {
                if (response.status >= 400 && response.status < 500) {
                    let error = await response.json();
                    console.log(error)
                    setInputError(error)
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
                action={{ label: 'Ok', onPress: () => { setInfoBarVisible(false) } }}
            >
                {infoBarText}
            </Snackbar>

            {loading && <OverlayActivityIndicator />}
            <ScrollView style={style.body}>

                <View style={style.headerContainer}>
                    <Text style={style.heading}>Welcome Back</Text>
                </View>

                <View style={style.imageContainer}>
                    <Image style={style.image} source={require("../../assets/login1.jpg")} />
                </View>

                <Text style={style.subText}>
                    Log In To Your Account
                </Text>

                {props.route?.params?.fromReset &&
                    <Text style={style.subText2}>
                        Password was reset successfully
                    </Text>
                }

                <View style={style.inputContainer}>

                    <TextInput style={style.input} value={phone}
                        onChangeText={text => setPhone(text)}
                        placeholder="Phone number"
                        maxLength={11}
                        keyboardType="numeric"
                        ref={phoneRef}
                        returnKeyType="next"
                        blurOnSubmit={false}
                        onSubmitEditing={() => { passRef.current.focus() }}
                    />
                    {inputError.phone &&
                        <HelperText type="error" visible={inputError.phone ? true : false} padding="none">
                            {inputError.phone}
                        </HelperText>
                    }
                </View>

                <View style={style.inputContainer}>

                    <TextInput style={style.input} value={password}
                        secureTextEntry={true}
                        onChangeText={text => setPassword(text)}
                        placeholder="Password"
                        maxLength={40}
                        ref={passRef}
                        returnKeyType="done"
                        // returnKeyLabel="Login"
                        onSubmitEditing={handleSubmit}
                    />
                    {inputError.password &&
                        <HelperText type="error" visible={inputError.password ? true : false} padding="none">
                            {inputError.password}
                        </HelperText>
                    }
                </View>

                <View style={style.submitButtonContainer}>
                    <TouchableOpacity onPress={handleSubmit}>
                        <Text style={style.submitButton}>Login </Text>
                    </TouchableOpacity>
                </View>


                <View style={style.infoTextContainer}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("InitiateReset", { phone: phone })}>
                        <Text style={style.link}> Forgot Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate("InitiateOTP")}>
                        <Text style={style.link}> Register Account</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </>
    )
}

export default Login

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

    heading2: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        color: "#5d5d5d",
        fontFamily: "serif",
        marginBottom: 20
    },
    subText: {
        textAlign: "center",
        color: "#a1a1a1",
        marginTop: 5,
        fontSize: 16,
        marginTop: 20,
        marginBottom: 5,
        fontFamily: "serif"
    },
    subText2: {
        textAlign: "center",
        color: "#a1a1a1",
        marginTop: 5,
        fontSize: 16,
        marginTop: 5,
        marginBottom: 20,
        fontFamily: "serif"
    },
    headerContainer: {
        marginTop: 10,
    },
    input: {
        fontSize: 16,
        borderRadius: 4,
        padding: 8,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: "#359d9e",
        borderWidth: 1.5,
        color: "#5d5d5d",
        fontFamily: "serif"
    },
    inputContainer: {
        marginTop: 10,
        marginBottom: 0,
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
        padding: 5,
        // fontFamily:"serif"
    },
    submitButtonContainer: {
        marginTop: 20,
        // marginBottom: 50
    },
    textCenter: {
        textAlign: "center"
    },

    infoText: {
        color: "#359d9e",
        textAlign: "center",
        fontFamily: "serif"
    },
    link: {
        color: "#359d9e",
        // fontWeight: "bold",
        fontFamily: "serif"
    },
    infoTextContainer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
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