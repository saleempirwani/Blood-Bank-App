import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {Container, Content} from 'native-base';
import {Picker} from '@react-native-picker/picker';
import Bar from 'react-native-progress/Bar';
import {getDonorData} from '../actions/actions';

import firebase from '../config/firebase';
import Box from '../components/Box';
import globalStyle from '../styles/styles';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  let state = useSelector((state) => state.userReducer);
  const database = firebase.database();

  useEffect(() => {
    const get = () => {
      let donor;
      try {
        database.ref('users/donor').on('value', (snapshot) => {
          donor = snapshot.val();
          donor = donor ? donor : {};
          // console.log('GET', donor);
          let keys = Object.keys(donor);
          donor = keys.map((k) => donor[k]);
          dispatch(getDonorData(donor));
        });
      } catch (e) {
        console.log('ERROR HomeScreen Firebase', e);
      }
    };
    get();
  }, []);

  // console.log('STATE => ', state);
  const bloodTypes = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('A+');

  const getDonor = () =>
    state.filter((donor) => donor.blood === selectedBloodGroup);

  return state.length ? (
    <Container style={styles.container}>
      <Content>
        <View style={globalStyle.picker}>
          <Picker
            selectedValue={selectedBloodGroup}
            style={{height: 50, width: '100%'}}
            onValueChange={(itemValue) => {
              setSelectedBloodGroup(itemValue);
            }}>
            {bloodTypes.map((blood, i) => (
              <Picker.Item key={i} label={blood} value={blood} />
            ))}
          </Picker>
        </View>
        {getDonor().length ? (
          getDonor().map((donor, i) => (
            <Box key={i} donor={donor} navigation={navigation} />
          ))
        ) : (
          <Text h4 style={styles.text}>
            No Blood Group Available
          </Text>
        )}
      </Content>
    </Container>
  ) : (
    <NoDonorFound />
  );
};

const NoDonorFound = () => {
  return (
    <Container style={globalStyle.midContainer}>
      <Text h2 style={{marginBottom: 10}}>
        No Donor Found
      </Text>
      <Text h4 style={{marginBottom: 50}}>
        Loading data...
      </Text>
      <Bar progress={0.8} width={250}/>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderWidth: 1,
  },

  text: {
    textAlign: 'center',
    marginTop: 30,
    color: '#ee2f25',
  },
});

export default Home;
