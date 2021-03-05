import React, { useState, useEffect } from "react"
import { Dimensions, StyleSheet, Image, View, TouchableOpacity, Text, TouchableHighlight } from "react-native"
import { baseUrl } from "../../config.json"
import { Card, Button, Title, Searchbar, TextInput, RadioButton } from "react-native-paper"
import Icon from "react-native-vector-icons/Ionicons"
import { Picker } from '@react-native-picker/picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export const FilterModal = (props) => {
  const [districtList, setDistrictList] = useState([])
  const [zoneList, setZoneList] = useState([])
  const [diseaseCategoryList, setDiseaseCategoryList] = useState([])

  async function loadListData(url, setFunc) {
    try {
      const response = await fetch(baseUrl + "/api" + url
      )
      if (response.ok) {
        const list = await response.json()
        setFunc(list.data)
      }
    } catch (err) {
      console.log(err)
    }
  }


  function handleSubmit() {
    props.onClose()
    props.handleSubmit()
  }


  useEffect(() => { loadListData("/district", setDistrictList) }, [])

  useEffect(() => {
    loadListData(`/zone?district=${props.formData.selectedDistrict}`, setZoneList)
  }, [props.formData.selectedDistrict])

  useEffect(() => {
    if (props.formData.searchIn == "doctor") {
      loadListData("/diseaseCategory", setDiseaseCategoryList)
    }
  }, [props.formData.searchIn])


  return (
    props.visible &&

    <View style={style.overlayContainer} >
      <View style={style.overlay}>
        <KeyboardAwareScrollView>

          <View style={style.formContainer} >

            <View style={style.formTitleContainer} >
              <Icon style={style.formFilterIcon} name="funnel-outline" color="#359d9e" size={18} />
              <Text style={style.formTitle}>Filter Your Search</Text>
            </View>

            <View style={style.textInputContainer} >
              <TextInput label="Search" style={style.textInput} mode="outlined"
                underlineColor="#359d9e" value={props.formData.query}
                theme={{ colors: { primary: "#359d9e", background: "#fff" } }}
                onChangeText={(text) => props.handleInput("query", text)} />
            </View>

{/* 
            <View style={style.pickerContainer} >
              <Text style={style.pickerLabel}>Search For</Text>

              <Picker selectedValue={props.formData.searchIn} style={style.picker}
                onValueChange={(value) => { props.handleInput("searchIn", value) }}
              >
                <Picker.Item label="Hospital" value="hospital" />
                <Picker.Item label="Doctor" value="doctor" />
                <Picker.Item label="Diagnostic" value="diagnostic" />

              </Picker>

            </View> */}

            <View style={style.pickerContainer} >
              <Text style={style.pickerLabel}>District</Text>

              <Picker selectedValue={props.formData.selectedDistrict} style={style.picker}
                onValueChange={(value) => { props.handleInput("selectedDistrict", value) }}
              >
                <Picker.Item label="Select" value="" />
                {districtList.map(i => <Picker.Item label={i.name} value={i._id} />)}

              </Picker>

            </View>


            <View style={style.pickerContainer} >
              <Text style={style.pickerLabel}>Zone</Text>

              <Picker selectedValue={props.formData.selectedZone} style={style.picker}
                onValueChange={(value) => { props.handleInput("selectedZone", value) }}
              >
                <Picker.Item label="Select" value="" />
                {zoneList.map(i => <Picker.Item label={i.name} value={i._id} />)}

              </Picker>

            </View>



            {props.type == "doctor" &&
              <View style={style.pickerContainer} >
                <Text style={style.pickerLabel}>Category</Text>

                <Picker selectedValue={props.formData.selectedDiseaseCategory} style={style.picker}
                  onValueChange={(value) => { props.handleInput("selectedDiseaseCategory", value) }}
                >
                  <Picker.Item label="Select" value="" />
                  {diseaseCategoryList.map(i => <Picker.Item label={i.name} value={i._id} />)}

                </Picker>

              </View>
            }

          </View>

          <View style={style.buttonContainer} >
            <Button icon="close" compact={true} color="#359d9e" onPress={props.onClose}>
              Cancel
          </Button>
            <Button icon="check" compact={true} color="#359d9e" onPress={handleSubmit}>
              Filter
          </Button>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
    || null
  )
}

export default FilterModal

const style = StyleSheet.create({

  overlayContainer: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: "#359d9ecc",
    width: "100%",
    height: Dimensions.get("window").height - 100,
    zIndex: 100,
    padding: "5%",
    justifyContent: "space-evenly"
  },
  overlay: {
    width: "100%",
    // height: "80%",
    backgroundColor: "#fff",
    opacity: 1,
    padding: 10,
    elevation: 3,
    borderRadius: 10
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
  },
  pickerContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 10

  },
  pickerLabel: {
    width: "30%",
    height: 35,
    fontSize: 16,
    marginTop: 5
  },
  picker: {
    width: "60%",
    height: 35
  },
  radioButtonGroup: {
    width: "100%",
    flexDirection: "row"
  },
  radioButton: {
    width: "33%"
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "flex-end"
  }
})