import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StartWorkout = ({ route }) => {
  const [plan, setPlan] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('email')
      .then(email => {
        if (email) {
          setEmail(email);
          axios.get(`http://192.168.100.8:5001/custom-plans/${email}`)
            .then(response => {
              if (response.data.success) {
                const transformedData = response.data.data.map(item => ({
                  id: item.exercise.id.toString(), // Assuming id should be a string
                  image: item.exercise.image,
                  name: item.exercise.name,
                  sets: item.exercise.sets
                }));
                setPlan(transformedData);
                console.log("PLANNNNN: ", plan)
              } else {
                console.error('Error retrieving custom plans:', response.data.message);
              }
            })
            .catch(error => {
              console.error('Error retrieving custom plans:', error);
            });
        } else {
          console.error('Email is null or undefined');
        }
      })
      .catch(error => {
        console.error('Error retrieving email from AsyncStorage:', error);
      });
  }, []);
  

  const deleteExercise = async (exerciseId) => {
    try {

      const updatedPlan = plan.filter((exercise) => exercise.id !== exerciseId);
      setPlan(updatedPlan);

      const response = await axios.delete(`http://192.168.137.1:5001/custom-plans/${exerciseId}`);  //192.168.137.1 Zohaib
      console.log('Exercise deleted from custom plan:', response.data);
    } catch (error) {
      console.error('Error deleting exercise from custom plan:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Workout Plan</Text>
      <FlatList
        data={plan}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.exerciseContainer}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.setsText}>Sets: {item.sets}</Text>
            <TouchableOpacity onPress={() => deleteExercise(item.id)} style={styles.deleteButton}>
              <Icon name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  exerciseContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  setsText: {
    fontSize: 16,
    color: '#555',
  },
  deleteButton: {
    marginLeft: 10,
  },
});

export default StartWorkout;
