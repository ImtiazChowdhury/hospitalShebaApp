import React, { useEffect, useState } from "react"
import { SafeAreaView, StyleSheet, View, Text, FlatList, Image, TouchableOpacity, Linking, RefreshControl } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { Card } from "react-native-paper"
import { baseUrl } from "../../config.json"
import HospitalListSearch from "../../components/services/HospitalListSearch"
import { OverlayActivityIndicator } from "../../components/OverlayActivityIndicator"
import CategoryIcon from "../../components/services/CategoryIcon"

export const AllDoctorCategories = ({ navigation, route }) => {

    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true)
    const [list, setList] = useState([])
    const [page, setPage] = useState(1);
    const [formData, setFormData] = useState({
        query: "",
        district: "",
        zone: "",
        diseaseCategory: "",
        searchIn: "doctor"
    })

    const [query, setQuery] = useState("")

    useEffect(() => {
        if (route.params && route.params.query) {
            setQuery(route.params.query);
            setFormData(prevState => ({ ...prevState, query: route.params.query }))
        }
    }, [route.params])


    function handleSubmit() {
        if (formData.searchIn == "doctor") {
            setQuery(formData.query)
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

    async function loadCategoryList() {
        try {
            setLoading(true)
            let url = baseUrl + "/api/diseaseCategory?"
            url += "&limit=27"
            url += "&page=1" 
            if (query) {
                url += "&query=" + query
            }

            const response = await fetch(url)

            if (response.ok) {
                const list = await response.json()
                setList(list.data)
            }
            setLoading(false)


        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }


    useEffect(() => { loadCategoryList() }, [query])

    async function onRefresh() {
        setPage(1)
        setRefreshing(true)
        await loadCategoryList();
        setRefreshing(false);
    }


    function renderItem({ item }) {
        return (

            <TouchableOpacity onPress={() => { navigation.navigate("DoctorList", { category: item._id }) }}>
                <CategoryIcon category={item} />
            </TouchableOpacity>
        )
    }

    async function loadMore() {
        try {
            setLoading(true)
            let url = baseUrl + "/api/diseaseCategory?"
            url += "&limit=27"
            url += "&page=" + (page+1)
            if (query) {
                url += "&query=" + query
            }

            const response = await fetch(url)
            if (response.ok) {
                const list = await response.json()
                if(list.data && list.data.length){
                    setPage(page+1);
                    setList(prevState=> [...prevState, ...list.data])
                }
            }
            setLoading(false)


        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    return (
        <SafeAreaView >

            <HospitalListSearch handleInput={handleInput} formData={formData} handleSubmit={handleSubmit} />
            {loading &&
                <OverlayActivityIndicator />
            }
            <FlatList
                data={list}
                key={'#'}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                style={{marginBottom:80}}
                // horizontal={false}
                numColumns={3}
                contentContainerStyle={style.listView}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#359d9e"]} />}
                onEndReached={loadMore}
                onEndReachedThreshold={.1}

            />
            {!loading && !list.length &&
                <View style={style.notFoundMessage} >
                    <Icon name="alert-circle-outline" size={75} color="#5d5d5d" />
                    <Text style={style.notFoundText}>No doctor found nearby</Text>

                </View>
            }

        </SafeAreaView>
    )
}
export default AllDoctorCategories

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
        // flexDirection: "row",
        // flexWrap: "wrap",
        // numColumns: 3,
        marginBottom: 80,
        // justifyContent:"space-between",
        // alignContent:"space-around",
        alignItems: "center"
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
        color: "#359d9ecc",

    },
    callIconContainer: {
        width: "10%",
        justifyContent: "center"
    },
    callIcon: {
        // borderWidth: 1,
        // borderColor:"#359d9e",
        // borderRadius: 40,
        // padding: 7
    }
})