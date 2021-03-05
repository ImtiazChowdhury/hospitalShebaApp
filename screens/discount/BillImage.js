import React, { Component, useEffect, useState } from 'react'
import {
	Alert,
	Linking,
	Dimensions,
	LayoutAnimation,
	Text,
	View,
	StatusBar,
	StyleSheet,
	TouchableOpacity,
	Button,
	Image,
	ScrollView
} from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import * as Permissions from "expo-permissions"
import Icon from 'react-native-vector-icons/Ionicons'
import * as ImagePicker from "expo-image-picker"
import { Snackbar } from "react-native-paper"
import { baseUrl } from "../../config.json"
import AsyncStorage from "@react-native-async-storage/async-storage"
import OverlayActivityIndicator from '../../components/OverlayActivityIndicator'

export const BillImage = (props) => {

	const [cameraPermission, setCameraPermission] = useState(null)
	const [infoBarVisible, setInfoBarVisible] = useState(false)
	const [infoBarText, setInfoBarText] = useState(false)
	const [imagePath, setImagePath] = useState(null)
	const [loading, setLoading] = useState(false)
	const [discountData, setDiscountData] = useState(null)

	useEffect(() => {
		setImagePath(null);
	}, [])
	useEffect(() => {
		(async () => {
			if (Platform.OS !== 'web') {
				const granted = ImagePicker.getCameraPermissionsAsync()
				if (!granted) {
					const permitted = ImagePicker.requestCameraPermissionsAsync()
					if (permitted) setCameraPermission(true)
				} else {
					setCameraPermission(true)
				}

			}
		})()
	}, [])

	async function openCamera() {
		const image = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images
		})

		if (!image.cancelled) {
			if (image.type != "image") {
				setInfoBarText("Invalid media type")
				setInfoBarVisible(true)
			} else {
				setImagePath(image.uri)
			}
		}
	}

	async function sendRequest() {

		let photo = {
			uri: imagePath,
			type: 'image/jpeg',
			name: 'photo.jpg',
		}
		let form = new FormData()

		form.append("hospital", props.route.params.hospital._id)
		form.append("bill", photo)

		try {
			setLoading(true);

			const response = await fetch(baseUrl + '/customer/api/bill/new', {
				body: form,
				method: "POST",
				headers: {
					'Content-Type': 'multipart/form-data',
					'x-access-token': await AsyncStorage.getItem("authToken"),
				}
			})

			if (response.ok) {
				const data = await response.json()
				console.log(data)
				setDiscountData(data[0]);
			} else {
				if (response.status >= 400 && response.status < 500) {
					const errorList = await response.json()
					setInfoBarText(Object.values(errorList)[0])
					setInfoBarVisible(true)
				} else if (response.status >= 500 && response.status < 600) {
					setInfoBarText("Could not process request!")
					setInfoBarVisible(true)
				}
			}
			setLoading(false)

		} catch (err) {
			console.log(err)
			setLoading(false)
			setInfoBarText("Client Error : Could not process")
			setInfoBarVisible(true)
		}
	}

	function reset(){
		setImagePath(null);
		setDiscountData(null)
		props.navigation.push("Main");
	}

	return (
		<>

			<ScrollView style={styles.container}>

				{loading && <OverlayActivityIndicator />}

				<View style={styles.headingContainer}>
					<Text style={styles.headingTitle}>{props.route.params.hospital.name} </Text>
					<Text style={styles.subHeading}>{props.route.params.hospital.address} </Text>
				</View>

				{!imagePath &&
					<View style={styles.buttonContainer}>
						<TouchableOpacity style={styles.buttonTouch} onPress={openCamera}>
							<Icon name="image" size={20} color="#fff" />
							<Text style={styles.buttonText} >Take Image of You Bill</Text>
						</TouchableOpacity>
					</View>
				}

				{imagePath &&
					<>
						<View style={styles.imageContainer}>
							<Image source={{ uri: imagePath }} style={styles.image} />
						</View>

						<View style={styles.actions}>
							<View style={styles.actionButtonView}>
								<TouchableOpacity style={styles.buttonTouch} onPress={openCamera}>
									<Icon name="reload-outline" size={20} color="#fff" />
									<Text style={styles.buttonText} >Retake</Text>
								</TouchableOpacity>
							</View>

							<View style={styles.actionButtonView}>
								<TouchableOpacity style={styles.buttonTouch} onPress={sendRequest}>
									<Text style={[styles.buttonText, { marginRight: 5 }]} >Get Discount</Text>
									<Icon name="chevron-forward-circle-outline" size={20} color="#fff" />
								</TouchableOpacity>
							</View>
						</View>
					</>
				}


			</ScrollView>
			{discountData &&
				<View style={styles.discountInfoContainer}>

					<View style={styles.discountInfo} >
						<Icon name="checkmark-sharp" size={60} color="#359d9e" />
						<Text style={styles.successHeading} >SUCCESS</Text>
						<Text style={styles.successText} >
							Bill Uploaded Successfully, please check out from the counter.
						</Text>
						<Text style={styles.code}>{discountData.shortCode}</Text>
						<View style={{}}>
							<Text style={styles.discountText}>
								Discount Amount:  {discountData.discountAmount}%
							</Text>
							<Text style={styles.discountText}>
								Upload Time: {new Date(discountData.created).toLocaleString()}
							</Text>

						</View>

						<View style={styles.modalButtonView}>
							<TouchableOpacity style={styles.modalButtonTouch}
								onPress={reset}
							>
								<Text style={styles.link}>Scan Again</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.modalButtonTouch}
								onPress={() => { props.navigation.navigate("Home") }}
							// onPress={()=>setDiscountData(null)}

							>
								<Text style={styles.link}>Ok</Text>
							</TouchableOpacity>
						</View>

					</View>
				</View>
			}

			<Snackbar visible={infoBarVisible} onDismiss={() => { setInfoBarVisible(false) }}
				style={{ marginBottom: 35 }}
				action={{ label: 'Ok', onPress: () => { setInfoBarVisible(false) } }}
			>
				{infoBarText}
			</Snackbar>

		</>
	)
}
export default BillImage

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// alignItems: 'center',
		// justifyContent: 'center',
		backgroundColor: '#fff',
	},
	bottomBar: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'rgba(0,0,0,0.5)',
		padding: 15,
		flexDirection: 'row',
	},
	scannerContainer: {
		backgroundColor: '#fff',
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width,
		alignItems: "center",
		justifyContent: "center"
	},
	url: {
		flex: 1,
	},
	urlText: {
		color: '#fff',
		fontSize: 20,
	},
	cancelButton: {
		marginLeft: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	cancelButtonText: {
		color: 'rgba(255,255,255,0.8)',
		fontSize: 18,
	},
	headingContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginBottom: 20,
		marginTop: 20,
		flexWrap: "wrap"
	},
	headingTitle: {
		fontSize: 22,
		fontFamily: "serif",
		marginLeft: 5,
		color: "#359d9e"
	},
	subHeadingContainer: {
		flexDirection: "row",
		marginTop: 10,
		flexWrap: "wrap",
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center"

	},
	subHeading: {
		fontSize: 14,
		fontFamily: "serif",
		marginLeft: 5,
		color: "#5d5d5d",
		marginTop: 10
	},
	scanner: {
		height: '60%',
		width: '90%',
		borderRadius: 50
	},
	buttonContainer: {
		justifyContent: "center",
		marginTop: 20,
		flexWrap: 'wrap',
		flexDirection: "row"
	},
	buttonTouch: {
		flexDirection: "row",
		backgroundColor: "#469d9e",
		padding: 10,
		borderRadius: 5,
	},
	buttonText: {
		color: "#fff",
		marginLeft: 10
	},
	image: {
		width: 200,
		height: 250
	},
	imageContainer: {
		marginTop: 30,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "#359d9e",
		alignSelf: "center"
	},
	actions: {
		flexDirection: "row",
		// flexWrap: "wrap",
		justifyContent: "space-around",
		marginTop: 20
	},
	actionButtonView: {
		width: "40%",
	},

	discountInfoContainer: {
		justifyContent: "center",
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height - 80,
		position: "absolute",
		top: 0,
		left: 0,
		zIndex: 100,
		backgroundColor: "#0005",

		justifyContent: "center",
		alignContent: "center",
		alignItems: "center"
	},

	discountInfo: {
		backgroundColor: "#fff",
		width: "80%",
		alignItems: "center",
		padding: 15,
		paddingTop: 20,
		paddingBottom: 20,
		borderRadius: 10
	},
	successHeading: {
		color: "#359d9e",
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 25
	},
	successText: {
		color: "#359d9e",
		fontSize: 16,
		marginTop: 10,
		textAlign: "center",
		marginBottom: 25,
		lineHeight: 22
	},
	modalButtonView: {
		marginTop: 25,
		justifyContent: "space-between",
		flexDirection: "row",
		width: "100%",
		padding: 5,
	},
	modalButtonTouch:{
		marginLeft: 20
	},
	link: {
		color: "#359d9e",
		fontWeight: "bold",
		alignSelf: "flex-end"
	},
	discountText: {
		color: "#5d5d5d",
		textAlign: "center",
		lineHeight: 18,
		fontSize: 14
	}
	,
	code: {
		fontSize: 18,
		color: "#359d9e",
		fontWeight: "bold",
		fontFamily: "serif",
		// width: "50%",
		textAlign:"center"
	},
})
