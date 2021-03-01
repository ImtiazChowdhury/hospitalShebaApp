import React, { useEffect, useState } from "react"
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { HelperText, Snackbar } from "react-native-paper"
import ProgressSteps from "../../components/authentication/ProgressSteps"
import OverlayActivityIndicator from "../../components/OverlayActivityIndicator"
import { baseUrl } from "../../config.json"
import AsyncStorage from '@react-native-async-storage/async-storage'

export const SetInformation = (props) => {

    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")

    const [loading, setLoading] = useState(false)
    const [inputError, setInputError] = useState({})
    const [infoBarVisible, setInfoBarVisible] = useState(false)
    const [infoBarText, setInfoBarText] = useState("")


    function handleSubmit(e) {
        requestUpdateProfile()
    }


    async function requestUpdateProfile() {
        try {

            if (!password) {
                return setInputError({ password: "Enter password" })
            }
            if (!repeatPassword) {
                return setInputError({ repeatPassword: "Enter password again" })
            }
            if (password !== repeatPassword) {
                return setInputError({ repeatPassword: "Passwords do not match" })
            }
          

            setLoading(true)

            const response = await fetch(baseUrl + '/customer/api/profile/update', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    ['x-access-token']: await AsyncStorage.getItem("authToken")
                },
                body: JSON.stringify({
                    password,
                })

            }) 
            
            if (response.ok) {
                const OTP = await response.json()
                setInputError({})
                props.navigation.push("Profile");
            } else {
                if(response.status == 403){
                    setInfoBarVisible(true);
                    setInfoBarText("Authorization Error")
                }
                else if (response.status >= 400 && response.status < 500) {
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

                <View style={style.headerContainer}>
                    <Text style={style.heading}>Change Password</Text>
                </View>

                <View style={style.imageContainer}>
                    <Image style={style.image} source={require("../../assets/password.jpg")} />
                </View>

{/* 
                <View style={style.headerContainer}>
                    <Text style={style.heading2}>Change Password</Text>
                </View> */}

                <View style={style.inputContainer}>

                    <TextInput style={style.input} value={password}
                        onChangeText={text => setPassword(text)}
                        placeholder="New Password"
                        maxLength={40}
                        secureTextEntry = {true}
                    />
                    {inputError.password &&
                        <HelperText type="error" visible={inputError.password ? true : false} padding="none">
                            {inputError.password}
                        </HelperText>
                    }
                </View>

                <View style={style.inputContainer}>

                    <TextInput style={style.input} value={repeatPassword}
                        onChangeText={text => setRepeatPassword(text)}
                        placeholder="Repeat New  Password"
                        maxLength={40}
                        secureTextEntry = {true}
                    />
                    {inputError.repeatPassword &&
                        <HelperText type="error" visible={inputError.repeatPassword ? true : false} padding="none">
                            {inputError.repeatPassword}
                        </HelperText>
                    }
                </View>


                <View style={style.submitButtonContainer}>
                    <TouchableOpacity onPress={handleSubmit}>
                        <Text style={style.submitButton}>Update</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </>
    )
}

export default SetInformation

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
        marginLeft: "10%",
        marginBottom: 60
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
        fontSize: 12
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
        marginTop: 5,
        marginBottom: 5,
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
        marginBottom: 50
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