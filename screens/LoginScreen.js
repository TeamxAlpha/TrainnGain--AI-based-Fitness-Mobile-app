import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} onPress={() => navigation.navigate('Home')} style={{ width: 200, height: 200, resizeMode: 'contain', marginBottom: 20 }} />
      <Text style={styles.header}>Login</Text>
      <Input
        placeholder="Email"
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        containerStyle={{ marginBottom: 20 }}
        leftIconContainerStyle={{ marginRight: 10 }}
      />
      <Input
        placeholder="Password"
        secureTextEntry
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        containerStyle={{ marginBottom: 20 }}
        leftIconContainerStyle={{ marginRight: 10 }}
      />
      <Button title="Log In" buttonStyle={{ backgroundColor: '#3F51B5' }} />
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>Don't have an account? Sign Up!</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  signupText: {
    color: '#3F51B5',
    marginTop: 20,
  },
});


export default Login;
