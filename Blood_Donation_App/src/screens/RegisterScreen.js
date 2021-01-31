import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {View} from 'react-native';
import {Container, Content, Form, Item, Input, Button, Text} from 'native-base';
import {Picker} from '@react-native-picker/picker';
import * as Progress from 'react-native-progress';

import {signUp} from '../actions/actions';
import {Logo, Heading} from '../components/Fields';
import styles from '../styles/styles';
import {
  emailValidation,
  isNetWorking,
  passwordValidation,
} from '../validation/validation';
import {
  nameValidation,
  addressValidation,
  phoneValidation,
} from '../validation/validation';

function Register({navigation}) {
  const bloodTypes = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];
  const dispatch = useDispatch();

  // States...
  const [next, setNext] = useState(false);
  const [userType, setUserType] = useState('acceptor');
  const [blood, setBlood] = useState('A+');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState({
    latitude: '',
    longitude: '',
  });
  const [credential, setCredential] = useState({
    email: '',
    password: '',
    cmfPassword: '',
  });

  // Register into Firebase

  const register = () => {
    let user = {};

    // Checking for Internet Connection
    if (!isNetWorking()) {
      return;
    }

    // Checking for Credential
    if (!validateCredential(credential)) {
      return;
    }

    if (userType === 'donor') {
      let check =
        nameValidation(name) &&
        addressValidation(address) &&
        phoneValidation(phone);

      if (!check) {
        return;
      }

      user = {
        credential,
        profile: {
          email: credential.email,
          name,
          address,
          phone,
          userType,
          blood,
          location: {
            longitude: '0',
            latitude: '0',
          },
        },
      };
    } else if (userType === 'acceptor') {
      user = {
        credential,
        profile: {
          email: credential.email,
          userType,
        },
      };
    }
    dispatch(signUp(user, userType));
    clear();
  };

  // Validation Credentials
  const validateCredential = (credential) => {
    const {email, password, cmfPassword} = credential;
    if (emailValidation(email) && passwordValidation(password, cmfPassword)) {
      return true;
    }
  };

  // Clear Fields
  const clear = () => {
    setCredential({email: '', password: '', cmfPassword: ''});
    setUserType('acceptor');
    setBlood('A+');
    setName('');
    setPhone('');
    setAddress('');
    setLocation({
      latitude: '',
      longitude: '',
    });
    setNext(false);
  };

  return (
    <Container style={next ? styles.midContainer : styles.container}>
      {next ? (
        <Progress.CircleSnail color={['red', 'green', 'blue']} size={60} />
      ) : (
        <Content>
          <View style={styles.content}>
            <Logo />
            <Heading text="Register" />
          </View>
          <Form>
            <Item regular style={styles.input}>
              <Input
                placeholder="Email *"
                value={credential.email}
                onChangeText={(text) =>
                  setCredential({...credential, email: text.toLowerCase()})
                }
              />
            </Item>

            <Item regular style={styles.input}>
              <Input
                placeholder="Password *"
                onChangeText={(text) =>
                  setCredential({...credential, password: text})
                }
                value={credential.password}
                secureTextEntry={true}
              />
            </Item>

            <Item regular style={styles.input}>
              <Input
                placeholder="Confirm Password *"
                onChangeText={(text) =>
                  setCredential({...credential, cmfPassword: text})
                }
                value={credential.cmfPassword}
                secureTextEntry={true}
              />
            </Item>

            <View style={styles.picker}>
              <Picker
                selectedValue={userType}
                style={{height: 50, width: '100%'}}
                onValueChange={(itemValue) => setUserType(itemValue)}>
                <Picker.Item label="Acceptor (User Type)" value="acceptor" />
                <Picker.Item label="Donor (User Type)" value="donor" />
              </Picker>
            </View>

            {userType === 'donor' ? (
              <>
                <View style={styles.content}>
                  <Heading text="Add Donor Info" />
                </View>
                <View style={styles.picker}>
                  <Picker
                    selectedValue={blood}
                    style={{height: 50, width: '100%'}}
                    onValueChange={(itemValue) => {
                      setBlood(itemValue);
                    }}>
                    {bloodTypes.map((blood, i) => (
                      <Picker.Item
                        key={i}
                        label={blood + '  (Blood Group)'}
                        value={blood}
                      />
                    ))}
                  </Picker>
                </View>

                <Item regular style={styles.input}>
                  <Input
                    placeholder="Name *"
                    value={name}
                    onChangeText={(text) => setName(text)}
                  />
                </Item>

                <Item regular style={styles.input}>
                  <Input
                    placeholder="Phone *"
                    keyboardType="numeric"
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                  />
                </Item>

                <Item regular style={styles.input}>
                  <Input
                    placeholder="Address *"
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                  />
                </Item>
              </>
            ) : null}
            <Button onPress={() => register()} large full style={styles.button}>
              <Text>Register</Text>
            </Button>

            <View>
              <Text>
                Already have an account?
                <Text
                  style={{color: 'blue'}}
                  onPress={() => navigation.navigate('Login')}>
                  {' '}
                  Login
                </Text>
              </Text>
            </View>
          </Form>
        </Content>
      )}
    </Container>
  );
}

export default Register;
