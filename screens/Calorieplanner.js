import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get("window").width;

const CaloriePlanner = () => {
  const [userData, setUserData] = useState({
    age: '',
    weight: '',
    height: '',
    activityLevel: 'moderate', // Default activity level
  });

  const [goal, setGoal] = useState('maintain'); // 'maintain', 'lose', 'gain'
  const [recommendedCalories, setRecommendedCalories] = useState(null);
  const [planProgress, setPlanProgress] = useState(0);

  // Calorie calculation based on user data and goal
  const calculateCalories = () => {
    const { age, weight, height, activityLevel } = userData;
    const activityMultiplier = {
      low: 1.2,
      moderate: 1.55,
      high: 1.9,
    };

    const BMR = 10 * weight + 6.25 * height - 5 * age + 5; // Simplified Harris-Benedict Formula
    let calories = BMR * activityMultiplier[activityLevel];

    // Adjust based on goal
    if (goal === 'lose') {
      calories -= 500;
    } else if (goal === 'gain') {
      calories += 500;
    }

    setRecommendedCalories(Math.round(calories));
  };

  // Visualization Data for Progress Chart
  const chartData = {
    data: [planProgress], // Progress out of 100%
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Calorie Intake Planner</Text>

      {/* User Data Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Age:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={userData.age}
          onChangeText={(val) => setUserData({ ...userData, age: val })}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Weight (kg):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={userData.weight}
          onChangeText={(val) => setUserData({ ...userData, weight: val })}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Height (cm):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={userData.height}
          onChangeText={(val) => setUserData({ ...userData, height: val })}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Activity Level:</Text>
        <TextInput
          style={styles.input}
          value={userData.activityLevel}
          placeholder="low, moderate, or high"
          onChangeText={(val) => setUserData({ ...userData, activityLevel: val })}
        />
      </View>

      {/* Goal Selection */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Goal:</Text>
        <Button
          title="Lose Weight"
          onPress={() => setGoal('lose')}
          color={goal === 'lose' ? 'green' : 'gray'}
        />
        <Button
          title="Maintain Weight"
          onPress={() => setGoal('maintain')}
          color={goal === 'maintain' ? 'blue' : 'gray'}
        />
        <Button
          title="Gain Weight"
          onPress={() => setGoal('gain')}
          color={goal === 'gain' ? 'red' : 'gray'}
        />
      </View>

      {/* Calculate and Display Results */}
      <View style={styles.result}>
        <Button title="Calculate Calories" onPress={calculateCalories} />
        {recommendedCalories && (
          <Text style={styles.resultText}>
            Recommended Daily Calorie Intake: {recommendedCalories} kcal
          </Text>
        )}
      </View>

      {/* Progress Visualization */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartHeader}>Your Progress</Text>
        <ProgressChart
          data={chartData}
          width={screenWidth * 0.9}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={{
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          hideLegend={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  result: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
  },
  chartContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  chartHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default CaloriePlanner;
