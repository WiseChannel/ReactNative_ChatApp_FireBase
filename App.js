import React from 'react';
import 'react-native-gesture-handler'

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
