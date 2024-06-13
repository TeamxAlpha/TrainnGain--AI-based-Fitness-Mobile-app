import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const StartWorkout = ({ route }) => {
  const { customPlan } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Workout Plan</Text>
      <FlatList
        data={customPlan}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.exerciseContainer}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.setsText}>Sets: {item.sets}</Text>
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
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  setsText: {
    fontSize: 16,
    color: '#555',
  },
});

export default StartWorkout;
