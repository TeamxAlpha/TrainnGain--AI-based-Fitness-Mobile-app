import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

const Signup = ({ navigation }) => {
  return (
    <>
      <Ionicons
        onPress={() => navigation.goBack()}
        style={{ position: 'absolute', top: 40, left: 20, backgroundColor: "white", borderRadius: 8, padding: 3 }}
        name="arrow-back-outline"
        size={24}
        color="black"
      />
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
    </>
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
