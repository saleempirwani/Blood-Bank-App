import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {signIn} from '../actions/actions';

import {View} from 'react-native';
import {Container, Content, Form, Item, Input, Button, Text} from 'native-base';

import {Logo, Heading} from '../components/Fields';
import styles from '../styles/styles';
import {
  emailValidation,
  emptyPasswordValidation,
  isNetWorking,
} from '../validation/validation';

function Login({navigation}) {
  const [next, setNext] = useState(false);
  const [credential, setCredential] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  // Login into Firebase
  const login = () => {
    // Checking for Internet
    if (!isNetWorking()) {
      return;
    }

    const {email, password} = credential;
    if (emailValidation(email) && emptyPasswordValidation(password)) {
      dispatch(signIn(credential));
      // setNext(true);
      clear();
    }
  };

  // Clear Fields
  const clear = () => {
    setCredential({
      email: '',
      password: '',
    });
  };

  return (
    <Container style={styles.container}>
      <Content>
        <View style={styles.content}>
          <Logo />
          <Heading text="Login" />
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

          <Button onPress={() => login()} large full style={styles.button}>
            <Text>Login</Text>
          </Button>

          <View>
            <Text>
              Don't have any account?
              <Text
                style={{color: 'blue'}}
                onPress={() => navigation.navigate('Register')}>
                {' '}
                Register
              </Text>
            </Text>
          </View>
        </Form>
      </Content>
    </Container>
  );
}

export default Login;
