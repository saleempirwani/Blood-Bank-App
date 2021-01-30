import React, { useState } from 'react'
import { Image, PermissionsAndroid, Platform, Alert, View } from 'react-native'
import { Container, Button, Text, } from 'native-base'
import Geolocation from '@react-native-community/geolocation';
import * as Progress from 'react-native-progress';
import locImage from '../../images/location.jpg'


const GetLocation = ({ navigation, route }) => {

    const user = route.params
    const [profile, setProfile] = useState(
        {
            ...user, location: {
                latitude: ' ',
                longitude: '',
            }
        })

    const [next, setNext] = useState(false)

    const requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            getOneTimeLocation();
            subscribeLocationLocation();
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                    title: 'Location Access Required',
                    message: 'This App needs to Access your location',
                },
                );

                console.log(granted)
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    findCoordinates()
                } else {
                    setLocationStatus('Permission Denied');
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };

    const findCoordinates = () => {
        setNext(true)
        Geolocation.getCurrentPosition(
            position => {
                const { coords: { longitude, latitude } } = position
                setProfile({
                    ...profile, location: {
                        longitude: JSON.stringify(longitude),
                        latitude: JSON.stringify(latitude)
                    }
                });

                console.log(profile)
                if (latitude !== 0 && longitude !== 0) {
                    setNext(false)
                    navigation.navigate('Home')
                }
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 }
        );
    }
    return (
        <Container style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {!next ?
                <View>
                    <Image
                        source={locImage}
                        alt="location"
                        resizeMode="contain"
                        style={{ width: 150, height: 150, marginBottom: 20, marginLeft: 45 }} />
                    <Button
                        onPress={() => requestLocationPermission()}
                        full
                        large
                        style={{
                            backgroundColor: '#E33D2F',
                            borderRadius: 50
                        }}>
                        <Text>Get Your Location</Text>
                    </Button>
                </View>
                : <Progress.CircleSnail color={['red', 'green', 'blue']} size={60} />
            }

        </Container>
    )
}

export default GetLocation
