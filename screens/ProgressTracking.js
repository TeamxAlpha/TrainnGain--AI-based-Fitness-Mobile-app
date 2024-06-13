import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeScreen;
