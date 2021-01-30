import React, { useState } from 'react'
import { Container, Content, Form, Item, Input, Button, Text, } from 'native-base';
import { Picker } from '@react-native-picker/picker';
import { View } from 'react-native'

import { Logo, Heading } from "../components/Fields";
import styles from '../styles/styles'
import { nameValidation, addressValidation, phoneValidation } from '../validation/validation'


function Profile({ navigation }) {

    const bloodTypes = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-']
    const [profile, setProfile] = useState({ name: '', phone: '', address: '', userType: 'acceptor', blood: 'A+', })

    // Add User Info into Firebase
    const addProfile = () => {
        const { name, phone, address } = profile
        console.log('Profile', profile)

        if (nameValidation(name) && phoneValidation(phone) && addressValidation(address)) {
            clear()
            navigation.navigate('Location', profile)
        }
    }

    // Clear Fields
    const clear = () => {
        setProfile({
            name: '', phone: '', address: '', userType: '', blood: '',
        })
    }
    return (
        <Container style={next ? styles.midContainer : styles.container}>
            <Content >
                <View style={styles.content} >
                    <Logo />
                    <Heading text="Add Profile Info" />
                </View>
                <Form >
                    <Item regular style={styles.input} >
                        <Input placeholder="Name *"
                            value={profile.name}
                            onChangeText={
                                (text) => setProfile({ ...profile, name: text })
                            } />
                    </Item >

                    <Item regular style={styles.input} >
                        <Input placeholder="Phone *"
                            keyboardType="numeric"
                            value={profile.phone}
                            onChangeText={
                                (text) => setProfile({ ...profile, phone: text })
                            } />

                    </Item >

                    <Item regular style={styles.input} >
                        <Input placeholder="Address *"
                            value={profile.address}
                            onChangeText={
                                (text) => setProfile({ ...profile, address: text })
                            } />
                    </Item >

                    <View style={styles.picker}>
                        <Picker
                            selectedValue={profile.userType}
                            style={{ height: 50, width: '100%', }}
                            onValueChange={(itemValue,) => { setProfile({ ...profile, userType: itemValue }) }
                            }>
                            <Picker.Item label="Acceptor (User Type)" value="acceptor" />
                            <Picker.Item label="Donor (User Type)" value="donor" />
                        </Picker>
                    </View>

                    {profile.userType === 'donor' ?
                        <View style={styles.picker}>
                            <Picker
                                selectedValue={profile.blood}
                                style={{ height: 50, width: '100%', }}
                                onValueChange={(itemValue,) => {
                                    setProfile({ ...profile, blood: itemValue })
                                }}>
                                {bloodTypes.map((blood, i) =>
                                    <Picker.Item key={i} label={blood} value={blood} />)}

                            </Picker>
                        </View> :
                        null
                    }

                    <Button onPress={() => addProfile()} large full style={styles.button}>
                        <Text>Submit</Text>
                    </Button>


                </Form >
            </Content>:

        </Container >
    )
}

export default Profile