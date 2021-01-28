import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, Image, View, TouchableOpacity, Text } from "react-native";
import { baseUrl } from "../../config.json";
import { Card, Snackbar, Title, Searchbar } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import {Picker} from '@react-native-picker/picker';


export const InPageSearchBar = (props) => {

    const [query, setQuery] = useState("");
    const [searchIn, setSearchIn] = useState("hospital")

    const clearIcon = <Icon name="close" size={16} color="#359d9e"/>

    function search(){

    }
    return (
        <View style={style.container}>

            <Searchbar style={style.searchBar} placeholder="Search" iconColor="#359d9e"
            value={query} onChangeText={(text)=>setQuery(text)} onIconPress={search}/>

            <Picker selectedValue={searchIn} onValueChange={(value)=>setSearchIn(value)}
            style={style.picker}>
                <Picker.Item label="Hospital" value="hospital" />
                <Picker.Item label="Doctor" value="Doctor" />
                <Picker.Item label="Diagnostic" value="Diagnostic" />

            </Picker>
        </View>
    )
}

export default InPageSearchBar;

const style = StyleSheet.create({
    container:{
        flexDirection: "row",
        padding:5
    },
    searchBar:{
        width: "70%",
        elevation:0,
        borderWidth: 1,
        borderColor: "#d5d5d5",
        borderStyle: "solid",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    },
    picker:{
        borderWidth: 1,
        borderColor: "#d5d5d5",
        borderStyle: "solid",
        width: "20%",
        borderTopLeftRadius:0,
        borderBottomLeftRadius:0,
        backgroundColor: "#fff",
        padding:2,
        color:"#5d5d5d",
        borderLeftWidth:0,
    }
})