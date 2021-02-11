import React, { useEffect, useState } from "react"
import { SafeAreaView, StyleSheet, ScrollView, View, Text, FlatList, Image, TouchableOpacity, TouchableHighlight, TouchableHighlightBase, TouchableHighlightComponent } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { Card, ActivityIndicator } from "react-native-paper"
import { baseUrl } from "../../config.json"
import HospitalListSearch from "../../components/services/HospitalListSearch"
import { TouchableNativeFeedback } from "react-native-gesture-handler"
import { RelativeActivityIndicator } from "../../components/RelativeActivityIndicator"

export const TestList = ({ navigation, route }) => {

	const [loading, setLoading] = useState(true)
	const [hospitals, setHospitals] = useState([])
	const [formData, setFormData] = useState({
		query: "",
		district: "",
		zone: "",
		diseaseCategory: "",
		searchIn: "hospital"
	})

	const [query, setQuery] = useState("")
	const [selectedDistrict, setSelectedDistrict] = useState("")
	const [selectedZone, setSelectedZone] = useState("")

	useEffect(()=>{
		if(route.params && route.params.query) {
			setQuery(route.params.query);
			setFormData(prevState=>({...prevState, query: route.params.query}))
		}
	}, [route.params])


	function handleSubmit() {
		if (formData.searchIn == "hospital") {
			setQuery(formData.query)
			setSelectedDistrict(formData.selectedDistrict)
			setSelectedZone(formData.selectedZone)
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

	async function loadHospitalList() {
		try {
			setLoading(true)
			navigator.geolocation.getCurrentPosition(async loc => {
				let url = baseUrl + "/api/service?"
				url += `latitude=${loc.coords && loc.coords.latitude}`
				url += `&longitude=${loc.coords && loc.coords.longitude}`
				url += "&limit=20&resolveHospital=1"
				if (selectedDistrict) {
					url += "&district=" + selectedDistrict
				}
				if (selectedZone) {
					url += "&zone=" + selectedZone
				}
				if (query) {
					url += "&query=" + query
				}
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


	useEffect(() => { loadHospitalList() }, [query, selectedZone, selectedDistrict])

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

							<View style={style.infoView}>
								<Text style={style.infoViewText}>৳ {item.charge}</Text>
							</View>

							<View style={style.address}>
								{/* <Icon name="location-sharp" color="#888" size={12} /> */}
								<Text style={style.addressText} numberOfLines={1} ellipsizeMode="tail">
									{item.hospital?.name}
								</Text>
							</View>


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
export default TestList

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
		flexDirection: "row",

	},
	addressText: {
		color: "#888",
		fontSize: 14,
		marginLeft: 2

	},

	textContainer: {
		width: "75%",
		paddingLeft: 10
	},
	infoView: {
		width: "auto",
		marginLeft: 5,
		padding: 2,
	},
	infoViewText: {
		color: "#369d9eee",
		fontSize: 15
	},
})