import React, { useEffect, useState } from "react"
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { HelperText, Snackbar } from "react-native-paper"
import ProgressSteps from "../../components/authentication/ProgressSteps"
import OverlayActivityIndicator from "../../components/OverlayActivityIndicator"
import { baseUrl } from "../../config.json"

export const InitiateOTP = (props) => {

	const [phone, setPhone] = useState("")
	const [loading, setLoading] = useState(false)
	const [inputError, setInputError] = useState({})
	const [infoBarVisible, setInfoBarVisible] = useState(false)
	const [infoBarText, setInfoBarText] = useState("")
	const [OTP, setOTP] = useState(null) //for progressBar

	function handleSubmit(e) {
		RequestInitiateOtp()
	}


	async function RequestInitiateOtp() {
		try {
			setLoading(true)

			const response = await fetch(baseUrl + '/api/register/initiate', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ phone })
			})

			if (response.ok) {
				const OTP = await response.json()
				setInputError({})
				setOTP(OTP)
				props.navigation.navigate("VerifyOTP", { OTP: OTP[0] })
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
			// action={{ label: 'Ok', onPress: () =>{ setInfoBarVisible(false)}}}
			>
				{infoBarText}
			</Snackbar>

			{loading && <OverlayActivityIndicator />}

			<ScrollView style={style.body}>
				<ProgressSteps stage={1} {...props} OTP={OTP} />

				<View style={style.headerContainer}>
					<Text style={style.heading}>Register Phone Number</Text>

				</View>

				<View style={style.imageContainer}>
					<Image style={style.image} source={require("../../assets/register2.jpg")} />
				</View>

				<Text style={style.subText}>
					Enter your phone number to register new account and get OTP through SMS
				</Text>

				<View style={style.phoneNumberInputContainer}>

					<TextInput style={style.phoneNumberInput} value={phone}
						onChangeText={text => setPhone(text)}
						placeholder="01*********" maxLength={11}
						keyboardType="numeric"
					/>
					<HelperText type="error" visible={inputError.phone ? true : false} padding="none">
						{inputError.phone}
					</HelperText>
				</View>



				<View style={style.submitButtonContainer}>
					<TouchableOpacity onPress={handleSubmit}>
						<Text style={style.submitButton}>REGISTER</Text>
					</TouchableOpacity>
				</View>

				<View style={style.infoTextContainer}>
					<Text style={style.infoText}>
						Already have an account?
                </Text>
					<TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
						<Text style={style.link}> Log In</Text>
					</TouchableOpacity>
				</View>

				<View style={style.agreeTextView}>

					<Text style={[style.subText, style.textStart]} >
						By registering you are agreeing to our
                </Text>
					<TouchableOpacity >
						<Text style={[style.pageLink, style.subText]}> Terms of Service</Text>
					</TouchableOpacity>

					<Text style={[style.subText]}> and </Text>

					<TouchableOpacity >
						<Text style={[style.pageLink, style.subText]}>Privacy Policy</Text>
					</TouchableOpacity>

				</View>


			</ScrollView>
		</>
	)
}

export default InitiateOTP

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
		color: "#369d9e",
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
		borderColor: "#369d9e",
		borderWidth: 1.5,
		letterSpacing: 14,
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
		marginBottom: 50,
		marginTop: 15

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
		marginTop: 10,
		flexDirection: "row",
		justifyContent: "center",
	}
})