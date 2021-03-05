import React, { useState, useEffect } from "react"
import { Dimensions, StyleSheet, Image, View, TouchableOpacity, Text, TouchableHighlight } from "react-native"
import { baseUrl } from "../../config.json"
import { Card, Snackbar, Title, Searchbar, TextInput } from "react-native-paper"
import Icon from "react-native-vector-icons/Ionicons"
import { Picker } from '@react-native-picker/picker'
import FilterModal from "./FilterModal";


export const HospitalListSearch = (props) => {

	const [query, setQuery] = useState(props.formData.query)
	const [modalOpen, setModalOpen] = useState(false)
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		props.handleInput("query", query)
	}, [query])

  useEffect(()=>{setQuery(props.formData.query)}, [props])


	return (
		<View>
			<View style={style.container}>

				<Searchbar inputStyle={style.input} style={style.searchBar} placeholder="Search" iconColor="#359d9e"
					value={query} onChangeText={(text) => setQuery(text)} onIconPress={props.handleSubmit} 
					onSubmitEditing={props.handleSubmit}  />

				<View style={style.filterIconContainer}>
					<TouchableOpacity onPress={() => { setModalOpen(true) }}>
						<Icon style={style.filterIcon} name="funnel-outline" size={18} />
					</TouchableOpacity>
				</View>
			</View>

			<FilterModal visible={modalOpen} onClose={() => setModalOpen(false)} type={props.type}
				handleInput={props.handleInput} 
				formData={props.formData} handleSubmit={props.handleSubmit}/>

		</View>
	)
}

export default HospitalListSearch

const style = StyleSheet.create({
	container: {
		flexDirection: "row",
		padding: 5,
		width: "100%",
	},
	searchBar: {
		width: "90%",
		elevation: 0,
		borderWidth: 1,
		borderColor: "#d5d5d5",
		borderStyle: "solid",
		borderRadius: 10,
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0,
		height: 40,
		borderRightWidth: 0
	},

	filterIconContainer: {
		height: 40,
		width: "10%",
		borderWidth: 1,
		borderColor: "#d5d5d5",
		borderRadius: 10,
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0,
		// flexDirection: "row",
		// justifyContent:"flex-start",
		borderLeftWidth: 0
	},
	filterIcon: {
		height: 40,
		marginTop: 10,
	},
	input: {
		color: "#5d5d5d"
	},
	overlayContainer: {
		flex: 1,
		position: 'absolute',
		left: 0,
		top: 0,
		backgroundColor: "#0009",
		width: "100%",
		height: Dimensions.get("window").height,
		zIndex: 100,
		padding: "5%"
	},
	overlay: {
		width: "100%",
		height: "80%",
		backgroundColor: "#fff",
		opacity: 1
	},
	closeBtnContainer: {
		alignItems: "flex-end",
		paddingRight: 2,
		paddingTop: 2,
		height: 10,
	},
	closeBtn: {
		// borderRadius: 5,
		// borderWidth: 1,
		// borderColor: "#359d9e"

	},
	formTitleContainer: {
		flexDirection: "row",
		justifyContent: "center"
	},
	formTitle: {
		color: "#359d9e",
		fontSize: 18,
		// fontWeight: "bold",
		marginLeft: 5

	},
	formFilterIcon: {
		marginTop: 4
	},
	textInputContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 10
	},
	textInput: {
		width: "90%",
		height: 35
	}
})