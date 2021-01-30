import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {View} from 'react-native';
import {Container, Content, Form, Item, Input, Button, Text} from 'native-base';
import {Picker} from '@react-native-picker/picker';
import * as Progress from 'react-native-progress';
import {PermissionsAndroid, Platform, Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

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
  // States...
  const [next, setNext] = useState(false);
  const bloodTypes = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];
  const [userKind, setUserKind] = useState('acceptor');
  const [credential, setCredential] = useState({
    email: '',
    password: '',
    cmfPassword: '',
  });
  const [acceptorProfile, setAcceptorProfile] = useState({
    credential: {...credential},
    profile: {
      email: '',
      userType: '',
    },
  });
  const [donorProfile, setDonorProfile] = useState({
    credential: {...credential},
    profile: {
      email: '',
      name: '',
      phone: '',
      address: '',
      userType: 'acceptor',
      blood: 'A+',
      location: {
        latitude: '',
        longitude: '',
      },
    },
  });

  useEffect(() => {}, [donorProfile, acceptorProfile]);

  const dispatch = useDispatch();

  // Register into Firebase
  console.log(userKind);
  const register = () => {
    // Checking for Internet Connection
    if (!isNetWorking()) {
      return;
    }

    // getLocation();
    // setNext(true);
    // return

    // Checking for Credential
    if (!validateCredential(credential)) {
      return;
    }

    if (userKind === 'donor') {
      const {name, address, phone} = donorProfile.profile;
      if (
        nameValidation(name) &&
        addressValidation(address) &&
        phoneValidation(phone)
      ) {
        // setDonorProfile({
        //   ...donorProfile,
        //   profile: {
        //     ...donorProfile.profile,
        //     email: credential.email,
        //     userType: userKind,
        //     location: {
        //       ...donorProfile.profile.location,
        //       longitude: JSON.stringify(longitude),
        //       latitude: JSON.stringify(latitude),
        //     },
        //   },
        //   credential: {...credential},
        // });
        setNext(true);
        getLocation();
      }
    } else {
      setAcceptorProfile({
        ...acceptorProfile,
        credential: {...credential},
        profile: {
          email: credential.email,
          userType: userKind,
        },
      });
      setNext(true);
      dispatch(signUp(acceptorProfile, userKind));
      clear();
    }
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
    setDonorProfile({
      credential: {...credential},
      profile: {
        email: '',
        name: '',
        phone: '',
        address: '',
        userType: 'acceptor',
        blood: 'A+',
        location: {latitude: '', longitude: ''},
      },
    });
    setAcceptorProfile({
      credential: {...credential},
      profile: {
        email: '',
        userType: '',
      },
    });
    setNext(false);
  };

  // getting location
  const getLocation = async () => {
    if (Platform.OS === 'ios') {
      findCoordinates();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );

        console.log('GRANTED', granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          findCoordinates();
        } else {
          alert('Permission Denied! could not get location, try again');
          setNext(false);
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const findCoordinates = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const {
          coords: {longitude, latitude},
        } = position;
        console.log(latitude, longitude);
        // Switch To Next Screen
        if (latitude !== 0 && longitude !== 0) {
          setDonorProfile({
            ...donorProfile,
            profile: {
              ...donorProfile.profile,
              email: credential.email,
              userType: userKind,
              location: {
                ...donorProfile.profile.location,
                longitude: JSON.stringify(longitude),
                latitude: JSON.stringify(latitude),
              },
            },
            credential: {...credential},
          });
          console.log('***********');
          // dispatch(signUp(donorProfile));
          console.log('######');
          clear();
        } else {
          setNext(false);
          alert('Could not get location try again.');
          return;
        }
      },
      (error) => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
    );
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
                  setCredential({...credential, email: text})
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
                selectedValue={userKind}
                style={{height: 50, width: '100%'}}
                onValueChange={(itemValue) => setUserKind(itemValue)}>
                <Picker.Item label="Acceptor (User Type)" value="acceptor" />
                <Picker.Item label="Donor (User Type)" value="donor" />
              </Picker>
            </View>

            {userKind === 'donor' ? (
              <>
                <View style={styles.content}>
                  <Heading text="Add Donor Info" />
                </View>
                <View style={styles.picker}>
                  <Picker
                    selectedValue={donorProfile.profile.blood}
                    style={{height: 50, width: '100%'}}
                    onValueChange={(itemValue) => {
                      setDonorProfile({
                        ...donorProfile,
                        profile: {...donorProfile.profile, blood: itemValue},
                      });
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
                    value={donorProfile.profile.name}
                    onChangeText={(text) =>
                      setDonorProfile({
                        ...donorProfile,
                        profile: {...donorProfile.profile, name: text},
                      })
                    }
                  />
                </Item>

                <Item regular style={styles.input}>
                  <Input
                    placeholder="Phone *"
                    keyboardType="numeric"
                    value={donorProfile.profile.phone}
                    onChangeText={(text) =>
                      setDonorProfile({
                        ...donorProfile,
                        profile: {...donorProfile.profile, phone: text},
                      })
                    }
                  />
                </Item>

                <Item regular style={styles.input}>
                  <Input
                    placeholder="Address *"
                    value={donorProfile.profile.address}
                    onChangeText={(text) =>
                      setDonorProfile({
                        ...donorProfile,
                        profile: {...donorProfile.profile, address: text},
                      })
                    }
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
