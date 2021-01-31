import React from 'react';
import {Text} from 'react-native-elements';
import {Container, Button, Text as TextView} from 'native-base';
import {useDispatch} from 'react-redux';
import {singOut, getDonorData} from '../actions/actions';

import globalStyle from '../styles/styles';

const DonorScreen = () => {
  const dispatch = useDispatch();

  return (
    <Container style={{...globalStyle.midContainer, padding: 10}}>
      <Text h2 style={{marginBottom: 10}}>
        Dear Donor
      </Text>
      <Text h4 style={{marginBottom: 10}}>
        Thanks for Registration
      </Text>
      <Text style={{fontSize: 20, textAlign: 'center', paddingHorizontal: 20}}>
        You will be informed by call or message that you provide us.
      </Text>

      <Button
        style={{borderRadius: 5, marginTop: 30, alignSelf: 'center'}}
        primary
        large
        onPress={() => {
          dispatch(singOut());
          dispatch(getDonorData([]));
        }}>
        <TextView>Logout</TextView>
      </Button>
    </Container>
  );
};

export default DonorScreen;
