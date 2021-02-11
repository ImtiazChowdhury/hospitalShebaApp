import AsyncStorage from "@react-native-async-storage/async-storage"

export async function isAuthenticated(){
  const token = await AsyncStorage.getItem("authToken");
  return token? true: false
}

export default isAuthenticated;