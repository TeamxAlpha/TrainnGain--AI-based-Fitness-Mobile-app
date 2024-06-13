import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');

  const signupSuccesful = () => {
    navigation.navigate('Login')
  }

async function handleSignup() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    return;
  }
  const userData = {
    name, email, password, age, weight, gender
  }
  axios.post("http://192.168.100.8:5001/register", userData)
    .then((res) => signupSuccesful())
    .catch(e => console.log(e))
}

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
      <Image source={require('../assets/logo.png')} onPress={() => navigation.navigate('Home')} style={{ width: 200, height: 200, resizeMode: 'contain', marginBottom: 20 }} />
      <Text style={styles.header}>Signup</Text>
      <Input
        placeholder="Name"
        leftIcon={{ type: 'font-awesome', name: 'user' }}
        containerStyle={{ marginBottom: 20 }}
        leftIconContainerStyle={{ marginRight: 10 }}
        value={name}
        onChangeText={text => setName(text)}
        autoCapitalize="none"
      />
      <Input
        placeholder="Email"
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        containerStyle={{ marginBottom: 20 }}
        leftIconContainerStyle={{ marginRight: 10 }}
        value={email}
        onChangeText={text => setEmail(text.toLowerCase())}
        autoCapitalize="none"
      />
      <Input
        placeholder="Age"
        leftIcon={{ type: 'font-awesome', name: 'hashtag' }}
        containerStyle={{ marginBottom: 20 }}
        leftIconContainerStyle={{ marginRight: 10 }}
        value={age}
        onChangeText={text => setAge(text)}
        autoCapitalize="none"
      />
      <Input
        placeholder="Gender"
        leftIcon={{ type: 'font-awesome', name: 'venus-mars' }}
        containerStyle={{ marginBottom: 20 }}
        leftIconContainerStyle={{ marginRight: 10 }}
        value={gender}
        onChangeText={text => setGender(text)}
        autoCapitalize="none"
      />
      <Input
        placeholder="Weight"
        leftIcon={{ type: 'font-awesome', name: 'balance-scale' }}
        containerStyle={{ marginBottom: 20 }}
        leftIconContainerStyle={{ marginRight: 10 }}
        value={weight}
        onChangeText={text => setWeight(text)}
        autoCapitalize="none"
      />
      <Input
        placeholder="Password"
        secureTextEntry
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        containerStyle={{ marginBottom: 20 }}
        leftIconContainerStyle={{ marginRight: 10 }}
        value={password}
        onChangeText={text => setPassword(text)}
        autoCapitalize="none"
      />
      <Button title="Sign Up" buttonStyle={{ backgroundColor: '#3F51B5' }} onPress={() => handleSignup()} />
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
