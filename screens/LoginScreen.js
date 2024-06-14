import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  async function handleLogin() {

    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
      }

      const response = await axios.post("http://192.168.137.1:5001/login", { //Zohaib's 192.168.137.1, Mahdi's 192.168.100.8
        email,
        password,
      });

      if (response.data.success) {
        const nameFromResponse = response.data.username;
        console.log(response.data)
        const emailFromResponse = response.data.email;
        await AsyncStorage.setItem("name", nameFromResponse);
        await AsyncStorage.setItem("email", emailFromResponse);
        console.log(nameFromResponse, "Login Name")
        navigation.navigate('Home')
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Error occurred while logging in");
      console.log(error);
    }
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
        <Text style={styles.header}>Login</Text>
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
          placeholder="Password"
          secureTextEntry
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          containerStyle={{ marginBottom: 20 }}
          leftIconContainerStyle={{ marginRight: 10 }}
          value={password}
          onChangeText={text => setPassword(text)}
          autoCapitalize="none"
        />
        <Button title="Log In" buttonStyle={{ backgroundColor: '#3F51B5' }} onPress={handleLogin} />
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupText}>Don't have an account? Sign Up!</Text>
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

export default Login;