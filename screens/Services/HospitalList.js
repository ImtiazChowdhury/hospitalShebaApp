import React, { useEffect, useState } from "react"
import { SafeAreaView, StyleSheet, View, Text, FlatList, Image, TouchableOpacity, RefreshControl } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { Card, } from "react-native-paper"
import { baseUrl } from "../../config.json"
import HospitalListSearch from "../../components/services/HospitalListSearch"
import { OverlayActivityIndicator } from "../../components/OverlayActivityIndicator"

export const HospitalList = ({ navigation, route }) => {

	const [refreshing, setRefreshing] = useState(false);
	const [loading, setLoading] = useState(true)
	const [hospitals, setHospitals] = useState([])
	const [page, setPage] = useState(1)
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
	const [loc, setLoc] = useState({
		coords: { latitude: 23.829, longitude: 90.418 }
	});

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(async loc => {
			setLoc(loc);
		})

	}, [])

	useEffect(() => {
		if (route.params && route.params.query) {
			setQuery(route.params.query);
			setFormData(prevState => ({ ...prevState, query: route.params.query }))
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

	async function requestList(page) {

		try {
			let url = baseUrl + "/api/hospital?";
			url += `latitude=${loc.coords && loc.coords.latitude}`;
			url += `&longitude=${loc.coords && loc.coords.longitude}`;
			url += "&limit=6&page=" + page;
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
				const list = await response.json();
				return list.data;
			}

			return []

		} catch (err) {
			console.log(err)
			return []
		}
	}

	async function loadHospitalList() {
		setLoading(true);
		let data = await requestList(1);
		setHospitals(data);
		setLoading(false);

	}

	async function onRefresh() {
		setRefreshing(true);
		setPage(1)
		await loadHospitalList();
		setRefreshing(false);
	}

	async function loadMore() {

		setLoading(true);
		let data = await requestList(page + 1);

		if (data.length) {
			setHospitals(prevState => [...prevState, ...data]);
			setPage(prevState => prevState + 1)
		}

		setLoading(false);
	}


	useEffect(() => { loadHospitalList() }, [query, selectedZone, selectedDistrict, loc])


	function renderItem({ item }) {
		return (

			<Card style={style.listCard} >
				<TouchableOpacity onPress={() => { navigation.navigate("HospitalDetail", { hospital: item._id }) }}>
					<View style={style.listView}>
						<Image source={{ uri: item.cover && (baseUrl + item.cover.medium) }} style={style.image} />
						<View style={style.textContainer}>

							<View style={style.title}>
								<Text style={style.titleText} numberOfLines={1} ellipsizeMode="tail">
									{item.name}
								</Text>
							</View>

							<View style={style.address}>
								{/* <Icon name="location-sharp" color="#888" size={12} /> */}
								<Text style={style.addressText} numberOfLines={1} ellipsizeMode="tail">
									{item.address}
								</Text>
							</View>

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

	return (
		<SafeAreaView>

			<HospitalListSearch handleInput={handleInput} formData={formData} handleSubmit={handleSubmit} />
			{loading &&
				<OverlayActivityIndicator />
			}
			<FlatList
				data={hospitals}
				renderItem={renderItem}
				keyExtractor={(item) => item._id}
				style={{ marginBottom: 80 }}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#359d9e"]} />}
				onEndReached={loadMore}
				onEndReachedThreshold={.1}
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
export default HospitalList

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
		width: "75%",
		paddingLeft: 10
	}
})