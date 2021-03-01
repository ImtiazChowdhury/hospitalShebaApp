import React, { useEffect, useState } from "react"
import { SafeAreaView, StyleSheet, ScrollView, View, Text, FlatList, Image, TouchableOpacity,Linking, Dimensions } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { Card, ActivityIndicator } from "react-native-paper"
import { baseUrl } from "../../config.json"
import HospitalListSearch from "../../components/services/HospitalListSearch"
import { TouchableNativeFeedback } from "react-native-gesture-handler"
import { RelativeActivityIndicator } from "../../components/RelativeActivityIndicator"
import HomeCarousel from "../../components/home/Carousel"

export const DoctorDetail = ({ navigation, route }) => {

	const [loading, setLoading] = useState(true)
	const [doctor, setDoctor] = useState({})


	async function loadDoctorDetail() {
		try {
			setLoading(true)
			let url = baseUrl + "/api/doctor/" + route.params.doctor +
				"?resolveHospital=1";
			const response = await fetch(url)

			if (response.ok) {
				const detail = await response.json()
				setDoctor(detail)
			}
			setLoading(false)

		} catch (err) {
			console.log(err)
			setLoading(false)
		}
	}



	useEffect(() => { loadDoctorDetail() }, []);

	return (
		<SafeAreaView>

			{loading &&
				<RelativeActivityIndicator />
			}

			{doctor &&
				<ScrollView>
					<HomeCarousel slides={[doctor.cover && baseUrl + doctor.cover.full]} />


					<View style={style.infoContainerMain}>
						<Text style={style.h_name}>{doctor.name}</Text>
						<Text style={style.h_description} >{doctor.description}</Text>
					</View>

					<View style={style.infoContainer}>
						<TouchableOpacity onPress={() => { navigation.navigate("HospitalDetail", { hospital: doctor.hospital._id }) }}>
							<Text style={[style.h_address,]} >Hospital:
								<Text style={style.link} > {doctor.hospital?.name}</Text>
							</Text>
						</TouchableOpacity>

						<TouchableOpacity onPress={() => {
							Linking.openURL(`tel:${doctor.phone}`)
						}}>
							<Text style={[style.h_address]} >Phone:
								<Text style={style.link} > {doctor.phone}</Text>
							</Text>
						</TouchableOpacity>

						<Text style={style.h_address} >Address: {doctor.hospital?.address}</Text>

						<Text style={style.h_address} ></Text>

						<Text style={style.h_address} >Visiting Day: {doctor.visitingDay}</Text>
						<Text style={style.h_address} >Visiting Time: {doctor.visitingTime}</Text>
						<Text style={style.h_address} >Visiting Fee: BDT. {doctor.visitingFee}</Text>

					</View>



				</ScrollView>
			}

			{!loading && !doctor &&
				<View style={style.notFoundMessage} >
					<Icon name="alert-circle-outline" size={75} color="#5d5d5d" />
					<Text style={style.notFoundText}>No hospital found nearby</Text>

				</View>
			}

		</SafeAreaView>
	)
}
export default DoctorDetail

const dimensions = Dimensions.get("window")
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

	infoContainer: {
		paddingLeft: 10,
		marginTop: 40,
	},
	infoContainerMain: {
		// paddingLeft: 10,
		marginTop: 10,
		padding: 5,
		justifyContent: "center"
	},
	h_name: {
		color: "#359d9e",
		fontSize: 18,
		fontWeight: "bold",
		fontFamily: "serif",
		textAlign: "center"
	},
	h_address: {
		fontSize: 14,
		fontFamily: "serif",
		color: "#444",
		lineHeight: 22
	},
	h_description: {
		marginTop: 15,
		fontSize: 15,
		fontFamily: "serif",
		color: "#777",
		lineHeight: 18,
		textAlign: "center"
	},
	tabHeadContainer: {
		margin: 10,
		borderRadius: 10,
		borderColor: "#359d9e",
		borderWidth: 2,
		flexDirection: "row",
		width: dimensions.width - 24,
		marginTop: 30
	},
	tabHead: {
		width: (dimensions.width - 28) / 2,
		padding: 8,
		textAlign: "center",
		// fontWeight:"bold",
		fontSize: 15,
		color: "#359d9e",
	},
	tabHeadRight: {
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5

	},
	tabHeadLeft: {
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5
	},
	selectedTab: {
		backgroundColor: "#359d9e",
		color: "#fff",
	},

	tabContent: {
		borderColor: "#eee",
		borderWidth: 1,
		margin: 10,
		marginTop: 5
	},

	image: {
		width: "25%",
		height: "100%",
		minHeight: 80,
		borderRadius: 5
	},
	listCard: {
		margin: 5,
		borderWidth: 1,
		borderColor: "#e1dfdf85",
		padding: 5,
		paddingLeft: 0,
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
		padding: 0
	},
	titleText: {
		color: "#359d9e",
		fontWeight: "bold",
		fontSize: 14,
	},
	phone: {
		padding: 0,
		marginLeft: 5,
		flexDirection: "row"

	},
	phoneText: {
		color: "#666",
		fontSize: 14,
		marginLeft: 2
	},
	address: {
		marginLeft: 5,
		padding: 0,
		flexDirection: "row"

	},
	addressText: {
		color: "#888",
		fontSize: 12,
		marginLeft: 2

	},

	textContainer: {
		width: "65%",
		paddingLeft: 5,

	},
	infoView: {
		width: "auto",
		marginLeft: 5,
		padding: 2,
	},
	infoViewText: {
		color: "#359d9ecc",

	},
	link: {
		color: "#359d9e"
	}
})