import * as Firebase from "firebase";

const firebaseConfig = {
  apiKey: 'AIzaSyD_PSAgt4NRpokgl4530JmxW8uwd_BBUVA',
  authDomain: 'msr-bloodbank.firebaseapp.com',
  projectId: 'msr-bloodbank',
  storageBucket: 'msr-bloodbank.appspot.com',
  messagingSenderId: '614137762194',
  appId: '1:614137762194:web:7e18e160b775c51c92f14b',
};
// Initialize Firebase
export default Firebase.initializeApp(firebaseConfig);
