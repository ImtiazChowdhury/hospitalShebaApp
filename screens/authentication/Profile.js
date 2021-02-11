import React, { useEffect, useState } from "react"
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { HelperText, Snackbar } from "react-native-paper"
import ProgressSteps from "../../components/authentication/ProgressSteps"
import OverlayActivityIndicator from "../../components/OverlayActivityIndicator"
import { baseUrl } from "../../config.json"
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from "react-native-vector-icons/Ionicons"

export const Profile = (props) => {

	const [loading, setLoading] = useState(false)
	const [infoBarVisible, setInfoBarVisible] = useState(false)
	const [infoBarText, setInfoBarText] = useState("")
	const [user, setUser] = useState(null)

	useEffect(() => {
		getUserDetail()
	}, [])


	async function getUserDetail() {
		try {
			setLoading(true)

			const response = await fetch(baseUrl + '/customer/api/profile', {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					['x-access-token']: await AsyncStorage.getItem("authToken")
				},
			})

			if (response.ok) {
				const data = await response.json()
				setUser(data)
			} else {
				if (response.status >= 400 && response.status < 500) {
					setInfoBarVisible(true)
					setInfoBarText("Could not load user information")
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

	async function logout() {
		await AsyncStorage.removeItem("authToken")
		props.navigation.navigate("Login")
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

				<View style={style.headerContainer}>
					<Text style={style.heading}>Your Information</Text>
				</View>

				<View style={style.imageContainer}>
					<Icon name="person-outline" size={120} style={style.userIcon} color="#5d5d5d" />
				</View>

				{user && <>
					<View style={style.infoContainerWrapper}>

						<View style={style.infoContainer} >
							<Icon style={style.infoTitle} name="person-sharp" size={20} />
							<Text style={style.infoText}>{user && user.name}</Text>
						</View>

						<View style={style.infoContainer} >
							<Icon style={style.infoTitle} name="call-sharp" size={20} />
							<Text style={style.infoText}>{user && user.phone}</Text>
						</View>


						<View style={style.infoContainer} >
							<Icon style={style.infoTitle} name="calendar" size={20} />
							<Text style={style.infoText}>Registered : {user && new Date(user.created).toLocaleDateString()}</Text>
						</View>


						<View style={style.infoContainer} >
							<Icon style={style.infoTitle} name="checkmark-circle-sharp" size={20} />
							<Text style={style.infoText}>Status: Verified</Text>
						</View>
					</View>

					<View style={style.linkContainer} >

						<TouchableOpacity onPress={() => props.navigation.navigate("Main")} style={style.linkTouch}>
							<Icon style={style.linkIcon} name="home" size={14} />
							<Text style={style.link}>Go To Home</Text>
						</TouchableOpacity>

						<TouchableOpacity style={style.linkTouch} onPress={() => props.navigation.navigate("Services")}>
							<Icon style={style.linkIcon} name="list" size={14} />
							<Text style={style.link}>Browse Services</Text>
						</TouchableOpacity>

						<TouchableOpacity style={style.linkTouch} onPress={logout}>
							<Icon style={style.linkIcon} name="power" size={14} />
							<Text style={style.link}>Log Out </Text>
						</TouchableOpacity>

					</View>
				</>
				}
				{!loading && !user &&
					<View style={style.notFoundMessage} >
						<Icon name="alert-circle-outline" size={60} color="#5d5d5d" />
						<Text style={style.notFoundText} >Could no load data</Text>
						{!navigator.onLine &&
							<Text style={style.notFoundText} >Check your internet connection</Text>
						}
					</View>
				}
			</ScrollView>
		</>
	)
}

export default Profile

const style = StyleSheet.create({
	body: {
		width: "100%",
		paddingLeft: "5%",
		paddingRight: "5%",
	},
	imageContainer: {
		justifyContent: "center",
		borderRadius: 300,
		borderColor: "#369d9e77",
		borderWidth: 2,
		width: 160,
		height: 160,
		alignItems: "center",
		alignContent: "center",
		alignSelf: "center",
		marginTop: 20,
		marginBottom: 30
	},

	userIcon: {
		// alignItems: "center",
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
		fontSize: 16,
		marginTop: 20,
		marginBottom: 20,
		fontFamily: "serif"
	},
	headerContainer: {
		marginTop: 10,
		marginBottom: 20
	},

	textCenter: {
		textAlign: "center"
	},
	infoContainerWrapper: {
		justifyContent: "center",
		width: "100%",
		// flexDirection: "row",
	},

	infoContainer: {
		alignSelf: "center",
		justifyContent: "flex-start",
		width: "100%",
		flexDirection: "row",
		marginBottom: 10
	},
	infoTitle: {
		fontSize: 20,
		color: "#369d9e",
		alignSelf: "center",
		marginRight: 10
	},
	infoText: {
		fontSize: 20,
		color: "#5d5d5d",
		alignSelf: "center",
		fontFamily: "serif"
	},
	linkContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20
	},
	link: {
		fontSize: 15,
		color: "#369d9e"
	},
	linkTouch: {
		flexDirection: "row"
	},
	linkIcon: {
		marginTop: 3,
		marginRight: 1,
		color: "#369d9ebb"
	},
	notFoundMessage:{
		justifyContent:"center",
		alignSelf:"center",
		alignItems:"center"
	},
	notFoundText:{
		margin: 5,
		color: "#5d5d5d"
	}
})