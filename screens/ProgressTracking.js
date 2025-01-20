import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ProgressTracking = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Tracker</Text>
      <Button
        title="Start Workout"
        onPress={() => navigation.navigate('StartWorkout', { customPlan: [] })} 
      />
      <Button
        title="Goal Achievement"
        onPress={() => navigation.navigate('GoalAchievement')}
      />
      <Button
        title="Performance Analytics"
        onPress={() => navigation.navigate('PerformanceAnalytics')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default ProgressTracking;
