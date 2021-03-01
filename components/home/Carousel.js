import React from "react"
import { Dimensions, StyleSheet, Image, View, TouchableOpacity } from "react-native"
import ImageSlider from 'react-native-image-slider'

const window = Dimensions.get('window')

export default class HomeCarousel extends React.Component {
	constructor(props) {
		super(props)
		this.props = props
		console.log(props)
	}

	render() {
		const slides = this.props.slides || []

		// const images = slides.map(i=>require(i.cover.thumbnail));

		return (
			<ImageSlider
				loopBothSides
				loop
				autoPlayWithInterval={2000}
				images={slides}
				customSlide={({ index, item, style, width }) => (
					<View style={[style, styles.slideHolder]} key={index}>
						<Image source={{ uri: item }} style={styles.imgFit} resizeMode="cover" />
					</View>

				)}
				customButtons={(position, move) => (
					<View style={styles.indicatorHolder}>
						{slides.map((slide, index) => {
							return (
								<TouchableOpacity key={index} underlayColor="transparent"
									onPress={() => move(index)} style={styles.indicator}
								>
									<View style={position === index && styles.indicatorSelected} />
								</TouchableOpacity>
							)
						})}
					</View>
				)}
				style={{
					backgroundColor: '#FFF',
					width: window.width,
					height: window.width / 2,
					marginVertical: 4,
				}}
			/>
		)
	}
}
const styles = StyleSheet.create({
	slideShow: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	slideHolder: {
		// elevation: 1,
		justifyContent: 'center',
		borderRadius: 10,
		borderColor: "#d5d5d5",
		borderWidth: 1,
		margin: 2
	},
	imgFit: {
		flex: 1,
		width: undefined,
		height: undefined,
		margin: 5
	},
	indicatorHolder: {
		width: window.width * 42 / 375,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		alignSelf: 'center',
		position: 'absolute',
		bottom: 10,
		marginHorizontal: 'auto'
	},
	indicator: {
		width: window.width * 6 / 375,
		height: window.width * 6 / 375,
		borderRadius: window.width * 3 / 375,
		backgroundColor: '#359d9e'
	},
	indicatorSelected: {
		width: window.width * 12 / 375,
		height: window.width * 6 / 375,
		borderRadius: window.width * 3 / 375,
		backgroundColor: '#359d9e'
	},
	sliderLargeText: {
		fontSize: 18,
		color: 'white',
		fontWeight: '700'
	},
	sliderTextAbsolute: {
		position: "absolute",
		color: 'white',
		left: window.width / 12,

	}
})