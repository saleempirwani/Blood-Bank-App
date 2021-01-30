import React from 'react';
import {StyleSheet} from 'react-native';
import {Container} from 'native-base';
import {Logo} from '../components/Fields';

function SplashScreen() {
return (
    <Container style={styles.container}>
      <Logo />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
