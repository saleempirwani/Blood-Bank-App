import React from 'react'
import { StyleSheet, View, } from 'react-native'
import { Text } from 'react-native-elements'
import { CardItem, Right, } from 'native-base';



const CardHeader = ({ name, blood }) => {
    return (
        <CardItem header style={styles.heading}>
            <Text h4
                style={styles.nameHeading}>
                {name}
            </Text>
            <Right>
                <Text h4
                    style={styles.blood}>
                    {blood}
                </Text>
            </Right>
        </CardItem>
    )
}

const CardContent = ({ item, value }) => {
    return (
        <View style={styles.cardItem}>
            <Text h4>
                {item}
            </Text>
            <Text style={styles.cardItemText}>
                {value}
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    card: {
        marginBottom: 20,
    },
    heading: {
        backgroundColor: '#ee2f25',
        color: '#fff'
    },
    nameHeading: {
        color: '#fff',
    },

    blood: {
        color: '#fff',
    },

    cardItem: {
        marginBottom: 15
    },

    cardItemText: {
        marginTop: 5,
        fontSize: 20,
        color: "#333",
    }
})

export { CardHeader, CardContent }