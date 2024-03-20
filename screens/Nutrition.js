import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const NutritionScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Gym Foods</Text>

      <View style={styles.section}>
        
        <Text style={styles.text}>Healthy Protein Bowl</Text>
      </View>

      <View style={styles.section}>
        
        <Text style={styles.text}>Avocado Toast</Text>
      </View>

      <Text style={styles.heading}>Diet Plans</Text>

      <View style={styles.section}>
        
        <Text style={styles.text}>Ketogenic Diet Plan</Text>
      </View>

      <View style={styles.section}>
        
        <Text style={styles.text}>Intermittent Fasting Plan</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
 
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NutritionScreen;
