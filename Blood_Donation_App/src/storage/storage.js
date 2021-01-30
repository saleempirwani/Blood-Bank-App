import AsyncStorage from '@react-native-async-storage/async-storage';


export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('ERROR @ Async removeData()', e);
  }
};

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log('ERROR @ Async storeData()', e.message);
  }
};

export const getData = async (key) => {
  let value;
  try {
    value = await AsyncStorage.getItem(key);
  } catch (e) {
    console.log('ERROR @ Async getData()', e.message);
  }
  return value;
};

