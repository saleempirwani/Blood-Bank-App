import React from 'react'
import { StyleSheet } from 'react-native'
import { Card, CardItem, Body, Button, Text } from 'native-base';
import { CardHeader, CardContent } from './CardItems'


const Box = ({ donor, navigation }) => {
    return (
        <Card style={styles.card}>
            <CardHeader name={donor.name} blood={donor.blood} />
            <CardItem >
                <Body>
                    <CardContent item="Phone" value={donor.phone} />
                    <CardContent item="Address" value={donor.address} />
                    <Button style={styles.btn}
                        full
                        onPress={() => navigation.navigate('Donor Details', donor)}>
                        <Text>More</Text>
                    </Button>
                </Body>
            </CardItem>
        </Card>
    )
}


const styles = StyleSheet.create({
    card: {
        marginBottom: 20,
    },
    btn: {
        marginTop: 10,
        borderRadius: 5,
    }
})

export default Box
