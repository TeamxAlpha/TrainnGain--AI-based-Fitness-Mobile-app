import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';

const Signup = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Signup</Text>
      <Input
        placeholder="Name"
        leftIcon={{ type: 'font-awesome', name: 'user' }}
        containerStyle={{ marginBottom: 20 }}
        leftIconContainerStyle={{ marginRight: 10 }}
      />
      <Input
        placeholder="Email"
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        containerStyle={{ marginBottom: 20 }}
        leftIconContainerStyle={{ marginRight: 10 }}
      />
      <Input
        placeholder="Age"
        leftIcon={{ type: 'font-awesome', name: 'hashtag' }}
        containerStyle={{ marginBottom: 20 }}
        leftIconContainerStyle={{ marginRight: 10 }}
      />
      <Input
        placeholder="Gender"
        leftIcon={{ type: 'font-awesome', name: 'venus-mars' }}
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
      <Button title="Sign Up" buttonStyle={{ backgroundColor: '#3F51B5' }} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signupText}>Already have an account? Log In!</Text>
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


export default Signup;
