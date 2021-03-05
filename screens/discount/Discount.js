import React, { Component, useState, useEffect } from 'react'
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
} from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import * as Permissions from "expo-permissions"
import Icon from 'react-native-vector-icons/Ionicons'
import { Snackbar } from "react-native-paper"
import { baseUrl } from "../../config.json"
import OverlayActivityIndicator from '../../components/OverlayActivityIndicator'
export const Discount = (props) => {

	const [hasCameraPermission, setHasCameraPermission] = useState(null)
	const [loading, setLoading] = useState(false)
	const [infoBarVisible, setInfoBarVisible] = useState(false)
	const [infoBarText, setInfoBarText] = useState(false)
	const [hospitalData, setHospitalData] = useState(null)
	const [QRData, setQRData] = useState(null)

	useEffect(() => {
		_requestCameraPermission()
	}, [])

	async function getHospitalDetails(id) {
		try {
			setLoading(true)
			const response = await fetch(baseUrl + '/api/hospital/' + id)

			if (response.ok) {
				const detail = await response.json()
				setLoading(false)

				return detail
			} else {

				setInfoBarText("Could not process request!")
				setInfoBarVisible(true)
			}
			setLoading(false)

		} catch (err) {
			console.log(err)
			setLoading(false)
		}
	}

	const _requestCameraPermission = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA)
		setHasCameraPermission(status === 'granted')
	}

	const _handleBarCodeRead = async result => {
		if (result) {
			LayoutAnimation.spring()
			if ( result.data) {
				setQRData(result.data)
			}
			return
		}
	}

	useEffect(() => {
		(async () => {
			if (QRData && QRData != null) {
				const hospitalDetail = await getHospitalDetails(QRData)

				if (!hospitalDetail) {
					setInfoBarText("Invalid QR Code")
					setInfoBarVisible(true)
					return
				}

				setHospitalData(hospitalDetail);

			}
		})()
	}, [QRData])

	useEffect(() => {
		if (hospitalData) {
			props.navigation.push("BillImage", { hospital: hospitalData })
		}
	}, [hospitalData])

	useEffect(() => {
		setQRData(null);
		setHospitalData(null)
	}, [])

	return (
		<View style={styles.container}>

			<Snackbar visible={infoBarVisible} onDismiss={() => { setInfoBarVisible(false) }}
				style={{ marginBottom: 35 }}
			action={{ label: 'Ok', onPress: () =>{ setInfoBarVisible(false)}}}
			>
				{infoBarText}
			</Snackbar>

			{loading && <OverlayActivityIndicator />}

			{hasCameraPermission === null ? (
				<Text>Requesting for camera permission</Text>
			) : hasCameraPermission === false ? (
				<Text style={{ color: '#5d5d5d' }}>
					Camera permission is not granted
				</Text>
			) : (
						<View style={styles.scannerContainer}>
							<View style={styles.headingContainer}>
								<Icon name="qr-code-outline" size={25} color="#359d9e" />
								<Text style={styles.headingTitle}>Scan QR Code </Text>
							</View>
							<BarCodeScanner onBarCodeScanned={_handleBarCodeRead}
								style={styles.scanner}
							/>

							<View style={styles.subHeadingContainer}>
								<Icon name="scan-circle-outline" size={25} color="#5d5d5d" />
								<Text style={styles.subHeading}>
									Point your camera toward the hospital QR Code
									</Text>
							</View>
						</View>
					)}

			<StatusBar hidden />
		</View>
	)
}

export default Discount

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#000',
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
		marginBottom: 20
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
		color: "#5d5d5d"
	},
	scanner: {
		height: '60%',
		width: '90%',
		borderRadius: 50
	}
})
