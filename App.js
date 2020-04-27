import React from 'react';
import 'react-native-gesture-handler'

import { decode, encode } from 'base-64' global.crypto = require("@firebase/firestore"); global.crypto.getRandomValues = byteArray => { for (let i = 0; i < byteArray.length; i++) { byteArray[i] = Math.floor(256 * Math.random()); } }
if (!global.btoa) { global.btoa = encode; }
if (!global.atob) { global.atob = decode; }

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

//import components
import MainStackNavigator from "./src/navigator/MainStackNavigator";


function App() {
  return (
      <MainStackNavigator />
  )
}

export default App;
