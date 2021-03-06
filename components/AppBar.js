import React, { useRef, useState, useEffect } from 'react'
import { Appbar } from 'react-native-paper'
import { StyleSheet, TouchableOpacity, View, TextInput, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { UserAvatar } from './UserAvatar'

export const AppBar = (props) => {

  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState("")

  const searchRef = useRef(null)

  useEffect(() => { searchRef?.current?.focus() }, [searchRef])

  function toggleSearch() {
    setSearchOpen(prevState => !prevState)
  }

  function search() {
    props.navigation.navigate("Services", { screen: "HospitalList", params: { query } })
  }

  return (
    <Appbar style={style.bar}>
      {!searchOpen &&
        <>
          <View style={style.menuButton} >
            <TouchableOpacity onPress={props.navigation.openDrawer}>
              <Icon name="menu-outline" size={24} style={style.menuIcon} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={style.titleView}>
            <Text style={style.headerTitle}>Hospital Sheba</Text>
          </View>
          <View style={style.actions}>

            <TouchableOpacity>
              <Icon name="search" size={24} style={style.searchIcon}
                color="#359d9e" onPress={toggleSearch} />
            </TouchableOpacity>


            <UserAvatar {...props} />

          </View>
        </>
      }
      {searchOpen &&
        <View style={style.actions}>

          <View style={style.closeIconView}>
            <TouchableOpacity onPress={toggleSearch}>
              <Icon name="arrow-back" size={24} color="#359d9e" style={style.closeIcon} />
            </TouchableOpacity>
          </View>
          <View style={style.searchBarView} >
            <TextInput style={style.searchBar}
              value={query}
              onChangeText={text => setQuery(text)}
              onSubmitEditing={search}
              ref={searchRef}
            />
          </View>
        </View>
      }

    </Appbar>
  )
}

export default AppBar

const style = StyleSheet.create({
  bar: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 50,
    paddingBottom: 20,
    // paddingLeft: 10,
    // paddingRight: 10,
    height: 80,
    elevation: 3,
  },
  menuButton: {

  },
  menuIcon: {
    padding: 4,
    backgroundColor: "#359d9e",
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5
  },
  titleView: {
    // flex:1,
    justifyContent: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  headerTitle: {
    fontFamily: "serif",
    fontSize: 20,
    color: "#359d9e"
  },
  searchIcon: {
    marginRight: 15,
  },
  searchBarView: {
    width: "80%",
    borderRadius: 5,
    borderColor: "#359d9e",
    borderWidth: 1,
  },
  searchBar: {
    width: "100%",
    height: 33,
    borderRadius: 5,
    margin: 2,
    fontSize: 18,
    color: "#5d5d5d",
    paddingLeft: 10,
    paddingRight: 10
  },
  closeIconView: {
    justifyContent: "center",
    // marginRight: 10,
    width: "15%"
  }
})