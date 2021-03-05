import React, { useEffect, useState } from "react"
import { SafeAreaView, StyleSheet, ScrollView, View, Text, FlatList, Image, TouchableOpacity, Dimensions } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { Card, ActivityIndicator } from "react-native-paper"
import { baseUrl } from "../../config.json"
import HospitalListSearch from "../../components/services/HospitalListSearch"
import { TouchableNativeFeedback } from "react-native-gesture-handler"
import { RelativeActivityIndicator } from "../../components/RelativeActivityIndicator"
import HomeCarousel from "../../components/home/Carousel"

export const HospitalDetail = ({ navigation, route }) => {

	const [loading, setLoading] = useState(true)
	const [hospital, setHospital] = useState({})
	const [tab, setTab] = useState("Doctor")
	const [doctorList, setDoctorList] = useState([]);
	const [testList, setTestList] = useState([]);


	async function loadHospitalDetail() {
		try {
			setLoading(true)
			let url = baseUrl + "/api/hospital/" + route.params.hospital;
			const response = await fetch(url)
			if (response.ok) {
				const detail = await response.json()
				setHospital(detail)
			}
			setLoading(false)

		} catch (err) {
			console.log(err)
			setLoading(false)
		}
	}


	async function loadDoctorList() {
		try {
			setLoading(true)
			let url = baseUrl + "/api/doctor?hospital=" + route.params.hospital;
			const response = await fetch(url)
			if (response.ok) {
				const list = await response.json()
				setDoctorList(list.data)
			}
			setLoading(false)

		} catch (err) {
			console.log(err)
			setLoading(false)
		}
	}

	async function loadTestList() {
		try {
			setLoading(true)
			let url = baseUrl + "/api/service?hospital=" + route.params.hospital;
			const response = await fetch(url)
			if (response.ok) {
				const list = await response.json()
				setTestList(list.data)
			}
			setLoading(false)

		} catch (err) {
			console.log(err)
			setLoading(false)
		}
	}


	useEffect(() => { loadHospitalDetail() }, []);
	useEffect(() => { loadDoctorList() }, []);
	useEffect(() => { loadTestList() }, []);




	function renderDoctor({ item }) {
		return (

			<Card style={style.listCard} >
				<TouchableOpacity onPress={() => { navigation.navigate("DoctorDetail", {doctor: item._id})}}>
					<View style={style.listView}>
						<Image source={{ uri: item.cover && (baseUrl + item.cover.medium) }} style={style.image} />
						<View style={style.textContainer}>

							<View style={style.title}>
								<Text style={style.titleText} numberOfLines={1} ellipsizeMode="tail">
									{item.name}
								</Text>
							</View>

							{item.diseaseCategory &&
								<View style={style.infoView}>
									<Text style={style.infoViewText}>{item.diseaseCategory.name}</Text>
								</View> || ""
							}
							<View style={style.phone}>
								{/* <Icon name="call-sharp" size={16} color="#666"/> */}
								<Text numberOfLines={1} style={style.phoneText} ellipsizeMode="tail">
									{item.phone}
								</Text>
							</View>

						</View>
						
					</View>
				</TouchableOpacity>
			</Card>
		)
	}

	
	function renderTest({ item }) {
		return (

			<Card style={style.listCard} >
				<TouchableOpacity onPress={() => {navigation.navigate("TestDetail", {test: item._id})} }>
					<View style={style.listView}>
						<Image source={{ uri: item.cover && (baseUrl + item.cover.medium) }} style={style.image} />
						<View style={style.textContainer}>

							<View style={style.title}>
								<Text style={style.titleText} numberOfLines={1} ellipsizeMode="tail">
									{item.name}
								</Text>
							</View>

							<View style={style.infoView}>
								<Text style={style.infoViewText}>৳ {item.charge}</Text>
							</View>


						</View>

					</View>
				</TouchableOpacity>
			</Card>
		)
	}



	return (
		<SafeAreaView>

			{loading &&
				<RelativeActivityIndicator />
			}

			{hospital &&
				<ScrollView>
					<HomeCarousel slides={hospital.image && hospital.image.map(i => baseUrl + i.full)} />
					<View style={style.infoContainer}>
						<Text style={style.h_name}>{hospital.name}</Text>
						<Text style={style.h_address} >{hospital.address}</Text>
						<Text style={style.h_address} >Phone: {hospital.phone}</Text>
					</View>

					<View style={style.tabHeadContainer}>
						<TouchableOpacity onPress={() => setTab("Doctor")}>
							<Text style={[style.tabHead, style.tabHeadLeft, tab == "Doctor" ? style.selectedTab : ""]}>Doctors</Text>
						</TouchableOpacity>

						<TouchableOpacity onPress={() => setTab("Test")}>
							<Text style={[style.tabHead, style.tabHeadRight, tab == "Test" ? style.selectedTab : ""]}>Diagnostic Tests</Text>

						</TouchableOpacity>
					</View>
					<View style={style.tabContent}>
						<FlatList
							data={tab=="Doctor"? doctorList : testList}
							renderItem={tab=="Doctor"? renderDoctor : renderTest}
							keyExtractor={(item) => item._id}
							ListEmptyComponent={()=><View style={style.notFoundMessage}>
								<Text style={style.notFoundText}>No {tab} Found</Text>
							</View>}
						/>
					</View>

					<View style={style.infoContainer}>
						<Text style={style.h_description} >{hospital.description}</Text>
					</View>
				</ScrollView>
			}

			{!loading && !hospital &&
				<View style={style.notFoundMessage} >
					<Icon name="alert-circle-outline" size={75} color="#5d5d5d" />
					<Text style={style.notFoundText}>No hospital found nearby</Text>

				</View>
			}

		</SafeAreaView>
	)
}
export default HospitalDetail

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
		marginTop: 10,
	},
	h_name: {
		color: "#359d9e",
		fontSize: 18,
		fontWeight: "bold",
		fontFamily: "serif"
	},
	h_address: {
		fontSize: 14,
		fontFamily: "serif",
		color: "#5d5d5d"
	},
	h_description: {
		marginTop: 20,
		fontSize: 13,
		fontFamily: "serif",
		color: "#5d5d5d",
		lineHeight: 18
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

	tabContent:{
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
		paddingLeft:0,
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
	
})