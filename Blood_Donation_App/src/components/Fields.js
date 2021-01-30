import React from 'react'
import {
    Image,
    Text
} from 'react-native-elements'


import { StyleSheet } from 'react-native'
import bloodlogo from '../../images/blood-logo.png'


const Logo = () =>
    <Image
        resizeMode="contain"
        source={bloodlogo}
        style={styles.image} />

const Heading = ({ text }) =>
    <Text
        h3
        style={styles.text}>
        {text}
    </Text>


const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        margin: 5,
    },
    text: {
        color: '#ee2f25',
    }
});



export {
    Logo,
    Heading,

}
