import React, { useState, useEffect } from "react"
import { Dimensions, StyleSheet, Image, View, TouchableOpacity, Text, } from "react-native"
import { baseUrl } from "../../config.json"
import { Card, Snackbar, Title, ActivityIndicator } from "react-native-paper"
import Icon from "react-native-vector-icons/Ionicons"
import HospitalImage from "../../assets/hospital.png"

export const NearestHospital = ({ navigation, route }) => {

	const [hospitals, setHospitals] = useState([])
	const [alert, setAlert] = useState(false)
	const [loading, setLoading] = useState(true)
	const [loc, setLoc] = useState({
		coords: { latitude: 24, longitude: 91}
	});

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(async loc => {
			setLoc(loc);
		})

	}, [])

	function navigateToHospitalList() {

		return navigation.navigate("HospitalList")

	}

	async function loadNearestHospitals() {
		try {
			setLoading(true)

			const response = await fetch(baseUrl + "/api/hospital?"
				+ `latitude=${loc.coords && loc.coords.latitude}`
				+ `&longitude=${loc.coords && loc.coords.longitude}`
				+ "&limit=5&sort=distance"
			)
			if (response.ok) {
				const list = await response.json()
				setHospitals(list.data)
			} else {
				setAlert(true)
			}
			setLoading(false)


		} catch (err) {
			console.log(err)
			setAlert(true)
			setLoading(false)
		}
	}


	useEffect(() => { loadNearestHospitals(); }, [loc])

	return (
		<View>
			<Snackbar
				visible={alert}
				duration={5000}
				theme={{ colors: { primary: "#c12127" } }}
				action={{ label: 'Ok', onPress: () => { setInfoBarVisible(false) } }}

			>Could not load data</Snackbar>

			<View style={style.titleContainer}>
				<Title style={style.heading}>Hospitals</Title>
				<TouchableOpacity onPress={navigateToHospitalList}>

					<View style={style.seeMoreView}>
						<Text style={style.seeMoreText}>See More</Text>
						<Icon style={style.seeMoreIcon} name="chevron-forward" color="#359d9e" size={16} />
					</View>
				</TouchableOpacity>
			</View>

			<View style={style.cardContainer}>
				{hospitals.length > 0 && hospitals.map(i => (

					<Card style={style.hospitalCard} key={i._id}>
						<TouchableOpacity onPress={() => navigation.navigate("HospitalDetail", { hospital: i._id })}>

							<Card.Cover style={style.cardImage} source={i.cover && { uri: baseUrl + i.cover.medium } || HospitalImage} />
							<View>
								<Text style={style.hospitalName}>{i.name}</Text>
							</View>
						</TouchableOpacity>
					</Card>

				))}


				{!loading && !hospitals.length &&
					<View style={style.notFoundMessage} >
						<Icon name="alert-circle-outline" size={75} color="#5d5d5d" />
						<Text style={style.notFoundText}>No hospital found nearby</Text>
					</View>
				}
				{loading &&
					<View style={style.notFoundMessage}>
						<ActivityIndicator color="#359d9e" size="small" />
					</View>
				}
			</View>
		</View>
	)
}

export default NearestHospital

const style = StyleSheet.create({
	hospitalCard: {
		width: "47%",
		marginBottom: 5,
		marginTop: 5,
	},
	cardContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		flexWrap: "wrap",
	},
	cardImage: {
		borderRadius: 5,
		// height:100,
		// width: 80,
	},
	notFoundMessage: {
		alignItems: "center",
		marginTop: 50,
		marginBottom: 50
	},
	notFoundText: {
		textAlign: "center",
		marginTop: 20,
		color: "#5d5d5d"
	},

	hospitalName: {
		fontWeight: "400",
		fontSize: 14,
		color: "#7e7e7e",
		padding: 5,
		textAlign: "center",
	},
	titleContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		margin: 2,
		marginTop: 20,
		padding: 2,
		paddingLeft: 5,
		paddingRight: 5,
		// borderColor: "#359d9e55",
		// borderWidth:1,
		// borderRadius:5,
		alignItems: "center",
		// backgroundColor:"#359d9e22"

	},
	heading: {
		fontSize: 16,
		fontWeight: "600",
		color: "#359d9e",
	},
	seeMoreView: {
		flexDirection: "row",
		alignItems: "center",
	},
	seeMoreText: {
		color: "#359d9e",
	},
	seeMoreIcon: {
		marginTop: 3
	}
})