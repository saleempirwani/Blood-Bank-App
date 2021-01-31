import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {Container} from 'native-base';

// import styles from '../styles/styles';
import {Logo} from '../components/Fields';

function SplashScreen() {
  return (
    <Container style={styles.container}>
      <Logo />
      <View style={{marginTop: 20}}>
        <Text h4 style={{color: 'gray', marginBottom: 10, alignSelf: 'center'}}>
          Created By
        </Text>
        <Text h4 style={{color: '#ee2f25', alignSelf: 'center'}}>
          Muhammad Saleem Raza
        </Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 30,
    // paddingHorizontal: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
