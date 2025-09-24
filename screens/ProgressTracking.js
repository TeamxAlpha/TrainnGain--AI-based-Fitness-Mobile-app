import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // for icons

const ProgressTracking = ({ navigation }) => {
  const options = [
    {
      title: "Start Workout",
      icon: "fitness-outline",
      onPress: () => navigation.navigate("StartWorkout", { customPlan: [] }),
    },
    {
      title: "Goal Achievement",
      icon: "trophy-outline",
      onPress: () => navigation.navigate("GoalAchievement"),
    },
    {
      title: "Performance Analytics",
      icon: "bar-chart-outline",
      onPress: () => navigation.navigate("PerformanceAnalytics"),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress Tracking</Text>
      <Text style={styles.subtitle}>
        Track your workouts, goals, and performance
      </Text>

      <View style={styles.cardContainer}>
        {options.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={item.onPress}
          >
            <Ionicons name={item.icon} size={32} color="#4CAF50" />
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 5,
  },
  cardContainer: {
    gap: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  cardText: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});

export default ProgressTracking;
