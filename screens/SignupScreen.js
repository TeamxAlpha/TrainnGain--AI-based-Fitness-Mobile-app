import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post("http://192.168.100.114:5001/register", {
        name,
        email,
        password,
        age,
        weight,
        gender,
      });

      if (response.data.success) {
        Alert.alert("Signup Successful", "You can now log in!");
        navigation.replace("Login");
      } else {
        Alert.alert("Signup Failed", response.data.message);
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Ionicons
        onPress={() => navigation.goBack()}
        style={styles.backButton}
        name="arrow-back-outline"
        size={24}
        color="black"
      />

      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />

        <Text style={styles.header}>Sign Up</Text>

        <TextInputStyled placeholder="Name" value={name} onChangeText={setName} />
        <TextInputStyled placeholder="Email" value={email} onChangeText={(text) => setEmail(text.toLowerCase())} keyboardType="email-address" />
        <TextInputStyled placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" />
        <TextInputStyled placeholder="Gender" value={gender} onChangeText={setGender} />
        <TextInputStyled placeholder="Weight (kg)" value={weight} onChangeText={setWeight} keyboardType="numeric" />
        <TextInputStyled placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signupText}>Already have an account? Log In!</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

// Reusable TextInput styled like Login page
const TextInputStyled = ({ placeholder, value, onChangeText, secureTextEntry = false, keyboardType = "default" }) => (
  <View style={{ width: "100%", marginBottom: 15 }}>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize="none"
    />
  </View>
);

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
    flexGrow: 1,
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

export default Signup;
