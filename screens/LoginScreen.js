import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Error", "Please enter both email and password.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Alert.alert("Invalid Email", "Please enter a valid email address.");
        return;
      }

      const response = await axios.post("http://192.168.100.114:5001/login", {
        email,
        password,
      });

      if (response.data.success) {
        const { userId, username, email: emailFromResponse } = response.data;

        // ✅ Store user data
        await AsyncStorage.setItem("userId", userId);
        await AsyncStorage.setItem("name", username);
        await AsyncStorage.setItem("email", emailFromResponse);

        Alert.alert("Login Successful", `Welcome back, ${username}!`);

        navigation.replace("Home"); // ✅ replace to avoid back navigation
      } else {
        Alert.alert("Login Failed", response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {/* Back button */}
      <Ionicons
        onPress={() => navigation.goBack()}
        style={styles.backButton}
        name="arrow-back-outline"
        size={24}
        color="black"
      />

      <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
        />

        <Text style={styles.header}>Login</Text>

        {/* Email input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* Password input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        {/* Login button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        {/* Navigate to signup */}
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signupText}>
            Don’t have an account? Sign Up!
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 3,
    zIndex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F4F6FA",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#3F51B5",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 15,
    borderRadius: 12,
    backgroundColor: "#fff",
    fontSize: 16,
    width: "100%",
    elevation: 2,
  },
  button: {
    backgroundColor: "#3F51B5",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    width: "100%",
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  signupText: {
    color: "#3F51B5",
    marginTop: 20,
    fontSize: 15,
    fontWeight: "500",
  },
});

export default Login;
