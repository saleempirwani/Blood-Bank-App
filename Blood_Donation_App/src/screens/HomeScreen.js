import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {Button, Container, Content} from 'native-base';
import {Picker} from '@react-native-picker/picker';
import * as Progress from 'react-native-progress';
import {getDonorData} from '../actions/actions';

import firebase from '../config/firebase';

import Box from '../components/Box';
import globalStyle from '../styles/styles';
// import data from '../../data/data';

const Home = ({navigation}) => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state.userReducer);

  const database = firebase.database();

  useEffect(() => {
    const get = () => {
      database.ref('users').on('value', (snapshot) => {
        let data = snapshot.val();
        let a = data.donor;
        dispatch(getDonorData(a == null ? [] : Object.values(a)));
      });
    };
    get();
  }, []);

  const bloodTypes = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('A+');
  const getDonor = () =>
    state.filter((donor) => donor.bloodGroup === selectedBloodGroup);

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
    <Container style={globalStyle.midContainer}>
      <Progress.CircleSnail size={50} color={['red', 'green', 'blue']} />
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
