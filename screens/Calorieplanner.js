import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { ProgressChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const CaloriePlanner = () => {
  const [userData, setUserData] = useState({
    age: "",
    weight: "",
    height: "",
    activityLevel: "moderate",
  });
  const [goal, setGoal] = useState("maintain");
  const [recommendedCalories, setRecommendedCalories] = useState(null);
  const [planProgress, setPlanProgress] = useState(0);

  const calculateCalories = () => {
    const { age, weight, height, activityLevel } = userData;
    if (!age || !weight || !height) return;

    const activityMultiplier = {
      low: 1.2,
      moderate: 1.55,
      high: 1.9,
    };

    const BMR = 10 * weight + 6.25 * height - 5 * age + 5;
    let calories = BMR * activityMultiplier[activityLevel];

    if (goal === "lose") calories -= 500;
    else if (goal === "gain") calories += 500;

    setRecommendedCalories(Math.round(calories));
    setPlanProgress(Math.min(calories / 3000, 1)); // Example progress
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* User Inputs */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Age"
          style={styles.input}
          keyboardType="numeric"
          value={userData.age}
          onChangeText={(val) => setUserData({ ...userData, age: val })}
        />
        <TextInput
          placeholder="Weight (kg)"
          style={styles.input}
          keyboardType="numeric"
          value={userData.weight}
          onChangeText={(val) => setUserData({ ...userData, weight: val })}
        />
        <TextInput
          placeholder="Height (cm)"
          style={styles.input}
          keyboardType="numeric"
          value={userData.height}
          onChangeText={(val) => setUserData({ ...userData, height: val })}
        />
        <TextInput
          placeholder="Activity Level (low, moderate, high)"
          style={styles.input}
          value={userData.activityLevel}
          onChangeText={(val) =>
            setUserData({ ...userData, activityLevel: val })
          }
        />
      </View>

      {/* Goal Selection */}
      <View style={styles.goalContainer}>
        {["lose", "maintain", "gain"].map((g) => (
          <TouchableOpacity
            key={g}
            style={[
              styles.goalButton,
              goal === g && styles.activeGoalButton,
              g === "lose" && { backgroundColor: goal === g ? "#F44336" : "#FFD6D6" },
              g === "maintain" && { backgroundColor: goal === g ? "#2196F3" : "#D6E9FF" },
              g === "gain" && { backgroundColor: goal === g ? "#4CAF50" : "#D6FFD6" },
            ]}
            onPress={() => setGoal(g)}
          >
            <Text style={[styles.goalText, goal === g && { color: "#fff" }]}>
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Calculate */}
      <TouchableOpacity style={styles.calculateButton} onPress={calculateCalories}>
        <Text style={styles.calculateButtonText}>Calculate Calories</Text>
      </TouchableOpacity>

      {/* Result Card */}
      {recommendedCalories && (
        <View style={styles.resultCard}>
          <Text style={styles.resultText}>
            Recommended Daily Calorie Intake
          </Text>
          <Text style={styles.calories}>{recommendedCalories} kcal</Text>
        </View>
      )}

      {/* Progress Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartHeader}>Your Progress</Text>
        <ProgressChart
          data={{ data: [planProgress] }}
          width={screenWidth * 0.9}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
          }}
          hideLegend={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F4F6FA",
    alignItems: "center",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#3F51B5",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    elevation: 2,
  },
  goalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  goalButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  activeGoalButton: {
    color: "#fff",
  },
  goalText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  calculateButton: {
    width: "100%",
    backgroundColor: "#3F51B5",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    elevation: 3,
  },
  calculateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  resultCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    alignItems: "center",
  },
  resultText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  calories: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3F51B5",
    marginTop: 8,
  },
  chartContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 40,
  },
  chartHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#3F51B5",
  },
});

export default CaloriePlanner;
