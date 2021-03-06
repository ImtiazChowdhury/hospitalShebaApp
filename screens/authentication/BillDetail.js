import React, { useEffect, useState } from "react"
import { SafeAreaView, StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { Card, Snackbar } from "react-native-paper"
import { OverlayActivityIndicator } from "../../components/OverlayActivityIndicator"

import { baseUrl } from "../../config.json"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from "react-native-gesture-handler"

export const BillDetail = (props) => {

	const [loading, setLoading] = useState(false)
	const [infoBarVisible, setInfoBarVisible] = useState(false)
	const [infoBarText, setInfoBarText] = useState("")
	const [detail, setDetail] = useState(null)

	useEffect(() => {
		getBillList()
	}, [])


	async function getBillList() {
		try {
			setLoading(true)

			let url = baseUrl + '/customer/api/bill/' + props.route.params.bill +
				"?resolveHospital=1";
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					['x-access-token']: await AsyncStorage.getItem("authToken")
				},
			})

			if (response.ok) {
				const data = await response.json()
				setDetail(data)
				console.log(data)
			} else {
				if (response.status >= 400 && response.status < 500) {
					setInfoBarVisible(true)
					setInfoBarText("Could not load bill information")
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

			{detail &&
				<ScrollView>
					<View style={style.imageContainer}>
						<Image style={style.image} source={{ uri: baseUrl + detail.image?.full }} />
					</View>
					<View style={style.infoContainer}>
						<Text style={style.code}>#{detail.shortCode}</Text>
						<Text style={style.status}>{detail.status}</Text>
						<Text style={style.date}>
							<Icon name="time-outline" size={14} />
							{new Date(detail.created).toLocaleString()}
						</Text>


						<Text style={style.totalBill}>Total Bill:
							{detail.totalBill && " \t\t\t\t\t\t\t BDT " + detail.totalBill + "/=" || " N/A"}
						</Text>
						<Text style={style.discount}>Discount:
							{detail.discount && " \t\t\t\t\t\t\t BDT " + detail.discount + "/=" || " N/A"}
						</Text>
						<Text style={style.discount}>Bill After Discount:
							{detail.billAfterDiscount && " \t\t BDT " + detail.billAfterDiscount + "/=" || " N/A"}
						</Text>
						<Text style={style.discountAmount}>Discount Amount:
							{detail.discountAmount && " \t\t " + detail.discountAmount + " %" || " N/A"}
						</Text>



						<Text style={style.discountAmount}>Last Update:
							{" " + new Date(detail.lastUpdated).toLocaleString()}
						</Text>

					</View>
				</ScrollView>
			}

		</>
	)
}

export default BillDetail

const style = StyleSheet.create({
	notFoundMessage: {
		alignItems: "center",
		marginTop: 50,
		marginBottom: 50
	},
	notFoundText: {
		textAlign: "center",
		marginTop: 20,
		color: "#5d5d5d",
		marginBottom: 20

	},
	imageContainer: {
		width: "100%",
		padding: 10,
		justifyContent: "center",
		backgroundColor: "#6666"
	},
	image: {
		width: "100%",
		height: 300,
		resizeMode: "contain"
	},
	infoContainer: {
		flexDirection: "row",
		padding: 10,
		flexWrap: "wrap",
	},
	code: {
		fontSize: 18,
		color: "#359d9e",
		fontWeight: "bold",
		fontFamily: "serif",
		width: "50%",
	},
	status: {
		fontSize: 18,
		color: "#359d9e",
		fontWeight: "bold",
		fontFamily: "serif",
		width: "50%",
		textAlign: "right"
	},
	date: {
		color: "#777",
		fontSize: 14,
		marginTop: 5
	},
	totalBill: {
		color: "#5d5d5d",
		fontSize: 14,
		width: "100%",
		marginTop: 15,
		lineHeight: 24,
	},
	discount: {
		color: "#5d5d5d",
		lineHeight: 24,
		fontSize: 14,
		width: "100%",
	},
	discountAmount: {
		color: "#5d5d5d",
		lineHeight: 24,
		fontSize: 14,
		width: "100%",
	},
})