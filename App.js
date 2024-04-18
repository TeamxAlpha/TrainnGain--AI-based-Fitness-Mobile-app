import React, { useState, useEffect } from 'react';
import { FitnessContext } from './Context';
import StackNavigator from './StackNavigator';
import { StatusBar } from 'expo-status-bar';
import { Image, View, StyleSheet } from 'react-native';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <FitnessContext>
      <StatusBar style="light" backgroundColor='#000' />
      {loading ? <LoadingScreen /> : <StackNavigator />}
    </FitnessContext>
  );
}

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
  logo: {
    width: 250, 
    height: 250,
  },
});
