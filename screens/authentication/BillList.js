import React, { useEffect, useState } from "react"
import { SafeAreaView, StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { Card, Snackbar } from "react-native-paper"
import { RelativeActivityIndicator } from "../../components/RelativeActivityIndicator"

import { baseUrl } from "../../config.json"
import AsyncStorage from '@react-native-async-storage/async-storage'

export const BillList = (props) => {

	const [loading, setLoading] = useState(false)
	const [infoBarVisible, setInfoBarVisible] = useState(false)
	const [infoBarText, setInfoBarText] = useState("")
	const [list, setList] = useState([])

	useEffect(() => {
		getBillList()
	}, [])


	async function getBillList() {
		try {
			setLoading(true)

			const response = await fetch(baseUrl + '/customer/api/bill?resolveHospital=1&sort=created&sortOrder=-1', {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					['x-access-token']: await AsyncStorage.getItem("authToken")
				},
			})

			if (response.ok) {
				const list = await response.json()
				setList(list.data)
				// console.log(list)
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


	function renderItem({ item }) {
		return (

			<Card style={style.listCard} >
				<TouchableOpacity onPress={() => { props.navigation.navigate("BillDetail", { bill: item._id }) }}>
					<View style={style.listView}>
						<View style={style.infoContainer}>

							<View style={style.textContainer}>

								<View style={style.title}>
									<Text style={style.titleText} numberOfLines={1} ellipsizeMode="tail">
										# {item.shortCode}
									</Text>
								</View>

								<View style={style.address}>
									{/* <Icon name="location-sharp" color="#888" size={12} /> */}
									<Text style={style.addressText} numberOfLines={1} ellipsizeMode="tail">
										{item.hospital?.name}
									</Text>
								</View>

								<View style={style.phone}>
									{/* <Icon name="call-sharp" size={16} color="#666"/> */}
									<Text numberOfLines={1} style={style.phoneText} ellipsizeMode="tail">
										{new Date(item.created).toLocaleString()}
									</Text>
								</View>

							</View>
							<View style={style.amountContainer}>

								<View style={style.phone}>
									{/* <Icon name="call-sharp" size={16} color="#666"/> */}
									<Text numberOfLines={1} style={style.titleText} ellipsizeMode="tail">
										{item.status}
									</Text>
								</View>

							</View>

						</View>
					</View>
				</TouchableOpacity>
			</Card>
		)
	}

	return (
		<>

			<Snackbar visible={infoBarVisible} onDismiss={() => { setInfoBarVisible(false) }}
				style={{ marginBottom: 35 }}
				action={{ label: 'Ok', onPress: () => { setInfoBarVisible(false) } }}
			>
				{infoBarText}
			</Snackbar> 

			{loading && <RelativeActivityIndicator />}
			<FlatList
				data={list}
				renderItem={renderItem}
				keyExtractor={(item) => item._id}
				ListEmptyComponent={() => <View style={style.notFoundMessage} >
					<Icon name="alert-circle-outline" size={75} color="#5d5d5d" />
					<Text style={style.notFoundText}>No Bills Found</Text>
				</View>
				} />

		</>
	)
}

export default BillList

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
	
	listCard: {
		margin: 5,
		borderWidth: 1,
		borderColor: "#e1dfdf85",
		padding: 5,
		borderRadius: 5,
		elevation: 1,
	},
	listView: {
		flexDirection: "row",
		flexWrap: "wrap",
		flex: 1,
		height: "100%",
		justifyContent: "space-around"
	},
	title: {
		marginLeft: 5,
		padding: 2
	},
	titleText: {
		color: "#359d9e",
		fontWeight: "bold",
		fontFamily:"serif",
		fontSize: 14,
	},
	phone: {
		padding: 2,
		marginLeft: 5,
		flexDirection: "row"

	},
	phoneText: {
		color: "#666",
		fontSize: 12,
		marginLeft: 2
	},
	address: {
		marginLeft: 5,
		padding: 2,
		flexDirection: "row"

	},
	addressText: {
		color: "#888",
		fontSize: 12,
		marginLeft: 2

	},
	infoContainer:{
		flexDirection:"row",
		justifyContent:"space-between",
		padding: 5,
		width:"100%"
	},
	textContainer: {
		width: "50%",
		paddingLeft: 10
	}
})