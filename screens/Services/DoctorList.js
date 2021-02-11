import React, { useEffect, useState } from "react"
import { SafeAreaView, StyleSheet, View, Text, FlatList, Image, TouchableOpacity,  Linking } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { Card, ActivityIndicator, Badge, Chip } from "react-native-paper"
import { baseUrl } from "../../config.json"
import HospitalListSearch from "../../components/services/HospitalListSearch"
import { TouchableNativeFeedback } from "react-native-gesture-handler"
import { RelativeActivityIndicator } from "../../components/RelativeActivityIndicator"

export const DoctorList = ({ navigation, route }) => {

	const [loading, setLoading] = useState(true)
	const [hospitals, setHospitals] = useState([])
	const [formData, setFormData] = useState({
		query: "",
		district: "",
		zone: "",
		diseaseCategory: "",
		searchIn: "doctor"
	})

	const [query, setQuery] = useState("")
	const [selectedDistrict, setSelectedDistrict] = useState("")
	const [selectedZone, setSelectedZone] = useState("")
	const [selectedDiseaseCategory, setDiseaseCategory] = useState("")

	useEffect(()=>{
		if(route.params && route.params.query) {
			setQuery(route.params.query);
			setFormData(prevState=>({...prevState, query: route.params.query}))
		}
	}, [route.params])


	function handleSubmit() {
		if (formData.searchIn == "doctor") {
			setQuery(formData.query)
			setSelectedDistrict(formData.selectedDistrict)
			setSelectedZone(formData.selectedZone)
			setDiseaseCategory(formData.selectedDiseaseCategory)
		}
	}

	function handleInput(key, value) {
		setFormData(prevState => {
			return {
				...prevState,
				[key]: value
			}
		})
	}

	async function loadDoctorList() {
		try {
			setLoading(true)
			navigator.geolocation.getCurrentPosition(async loc => {
				let url = baseUrl + "/api/doctor?"
				url += `latitude=${loc.coords && loc.coords.latitude}`
				url += `&longitude=${loc.coords && loc.coords.longitude}`
				url += "&limit=20&resolveDiseaseCategory=1&resolveHospital=1"

				if (selectedDistrict) {
					url += "&district=" + selectedDistrict
				}
				if (selectedZone) {
					url += "&zone=" + selectedZone
				}
				if (query) {
					url += "&query=" + query
				}
				if (selectedDiseaseCategory) {
					url += "&diseaseCategory=" + selectedDiseaseCategory
				}
				console.log(url)
				const response = await fetch(url)

				if (response.ok) {
					const list = await response.json()
					setHospitals(list.data)
				}
				setLoading(false)

			})

		} catch (err) {
			console.log(err)
			setLoading(false)
		}
	}


	useEffect(() => { loadDoctorList() }, [query, selectedZone, selectedDistrict, selectedDiseaseCategory])

	function renderItem({ item }) {
		return (

			<Card style={style.listCard} >
				<TouchableOpacity onPress={() => { }}>
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
							<View style={style.address}>
								{/* <Icon name="location-sharp" color="#888" size={12} /> */}
								<Text style={style.addressText} numberOfLines={1} ellipsizeMode="tail">
									{item.hospital && item.hospital.name || ""}
								</Text>
							</View>

							<View style={style.phone}>
								{/* <Icon name="call-sharp" size={16} color="#666"/> */}
								<Text numberOfLines={1} style={style.phoneText} ellipsizeMode="tail">
									{item.phone}
								</Text>
							</View>

						</View>
						<View style={style.callIconContainer} >
							{item.phone &&
								<TouchableOpacity onPress={()=>{
									Linking.openURL(`tel:${item.phone}`)
								}}>
									<Icon name="call-sharp" size={20} color="#369d93" style={style.callIcon} />
								</TouchableOpacity>}
						</View>
					</View>
				</TouchableOpacity>
			</Card>
		)
	}

	return (
		<SafeAreaView>

			<HospitalListSearch handleInput={handleInput} formData={formData} handleSubmit={handleSubmit} />
			{loading &&
				<RelativeActivityIndicator />
			}
			<FlatList
				data={hospitals}
				renderItem={renderItem}
				keyExtractor={(item) => item._id}
			/>
			{!loading && !hospitals.length &&
				<View style={style.notFoundMessage} >
					<Icon name="alert-circle-outline" size={75} color="#5d5d5d" />
					<Text style={style.notFoundText}>No hospital found nearby</Text>

				</View>
			}

		</SafeAreaView>
	)
}
export default DoctorList

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
	image: {
		width: "25%",
		height: "100%",
		minHeight: 80,
		borderRadius: 10
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
		fontSize: 16,
	},
	phone: {
		padding: 2,
		marginLeft: 5,
		flexDirection: "row"

	},
	phoneText: {
		color: "#666",
		fontSize: 16,
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

	textContainer: {
		width: "65%",
		paddingLeft: 10,

	},
	infoView: {
		width: "auto",
		marginLeft: 5,
		padding: 2,
	},
	infoViewText: {
		color: "#369d9ecc",

	},
	callIconContainer: {
		width: "10%",
		justifyContent: "center"
	},
	callIcon: {
		// borderWidth: 1,
		// borderColor:"#369d9e",
		// borderRadius: 40,
		// padding: 7
	}
})