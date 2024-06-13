import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const GoalAchievement = () => {
  const [goal, setGoal] = useState('');
  const [userId, setUserId] = useState(''); // Assume userId is set appropriately
  const [goalStatus, setGoalStatus] = useState(null);

  const setNewGoal = async () => {
    try {
      const response = await axios.post(`http://192.168.137.1:5001/set-goal/${userId}`, { goal }); //Zohaib's 192.168.137.1, Mahdi's 192.168.100.8
      console.log('Goal set:', response.data);
    } catch (error) {
      console.error('Error setting goal:', error);
    }
  };

  const checkGoal = async () => {
    try {
      const response = await axios.get(`http://192.168.137.1:5001/check-goal/${userId}`); //Zohaib's 192.168.137.1, Mahdi's 192.168.100.8
      setGoalStatus(response.data.isGoalAchieved ? 'Goal Achieved!' : 'Keep Going!');
    } catch (error) {
      console.error('Error checking goal:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Your Goal</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your goal"
        value={goal}
        onChangeText={setGoal}
      />
      <Button title="Set Goal" onPress={setNewGoal} />
      <Button title="Check Goal" onPress={checkGoal} />
      {goalStatus && <Text style={styles.goalStatus}>{goalStatus}</Text>}
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  goalStatus: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default GoalAchievement;
