import { PermissionsAndroid, Platform, Alert, } from 'react-native'
import Geolocation from '@react-native-community/geolocation';

const location = (loc) => loc

const getLocation = async () => {
    if (Platform.OS === 'ios') {
        findCoordinates()
    } else {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                title: 'Location Access Required',
                message: 'This App needs to Access your location',
            },
            );

            console.log("GRANTED", granted)
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                findCoordinates()
            } else {
                console.log('Permission Denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }
};

const findCoordinates = () => {
    Geolocation.getCurrentPosition(
        position => {
            const { coords: { longitude, latitude } } = position
            // return {
            //     longitude: JSON.stringify(longitude),
            //     latitude: JSON.stringify(latitude)
            // }
            loc({
                longitude: JSON.stringify(longitude),
                latitude: JSON.stringify(latitude)
            })
        },
        error => Alert.alert(error.message),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 }
    );
}

export default loc
