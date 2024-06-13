import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const StartWorkout = ({ route }) => {
  const { customPlan } = route.params;
  const [plan, setPlan] = useState(customPlan);

  const deleteExercise = async (exerciseId) => {
    try {

      const updatedPlan = plan.filter((exercise) => exercise.id !== exerciseId);
      setPlan(updatedPlan);

      const response = await axios.delete(`http://192.168.137.1:5001/custom-plans/${exerciseId}`);
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
