import React from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { baseUrl } from "../../config.json"

function CategoryIcon(props) {
    const { name, cover } = props.category
    return (
        <View style={style.iconView}>
            <View style={style.imageView}>

                {cover && cover.thumbnail && 
                    <Image source={{uri: baseUrl + cover.thumbnail}} style={style.image} />
                }
                {!cover &&
                    <Icon name="category" size={30} color="#3333" />
                }
            </View>
            <Text style={style.name}>{name}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    iconView: {
        padding: 5,
        borderColor: "#359d9e25",
        borderWidth: 1,
        margin: 5,
        justifyContent: "center",
        width: 100,
        height: 80,
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#359d9e05"
    },
    imageView: {
        width: 40,
        height: 40
    },
    name: {
        color: "#5d5d5d",
        fontFamily: "serif",
        fontSize: 13,
        textAlign: "center"
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "stretch"
    }
})

export default CategoryIcon
