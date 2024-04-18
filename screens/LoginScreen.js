import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { Header } from 'react-native-elements';

const Login = () => {
  const navigation = useNavigation(); 

  return (

  
    <View style={styles.container}>
      <Text style={styles.heading}>Gym Foods</Text>

      <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('NutritionScreen')}>
        <Text style={styles.text}>Healthy Protein Bowl</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('NutritionScreen')}>
        <Text style={styles.text}>Avocado Toast</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Diet Plans</Text>

      <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('NutritionScreen')}>
        <Text style={styles.text}>Ketogenic Diet Plan</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('NutritionScreen')}>
        <Text style={styles.text}>Intermittent Fasting Plan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 20,
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: '#cccccc',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666666',
  },
});

export default Login;
