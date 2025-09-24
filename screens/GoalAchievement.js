  import React, { useState, useEffect } from "react";
  import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Animated,
    FlatList,
  } from "react-native";
  import axios from "axios";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { MaterialCommunityIcons } from "@expo/vector-icons";

  const GoalAchievement = () => {
    const [goal, setGoal] = useState("");
    const [userId, setUserId] = useState("");
    const [goals, setGoals] = useState([]); // store multiple goals
    const [notification, setNotification] = useState({ message: "", type: "" });
    const [slideAnim] = useState(new Animated.Value(-100));

    useEffect(() => {
      const fetchUserId = async () => {
        const id = await AsyncStorage.getItem("userId");
        if (id) setUserId(id);
      };
      fetchUserId();
    }, []);

    // Slide-down notification
    const showNotification = (message, type) => {
      setNotification({ message, type });
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(slideAnim, {
            toValue: -100,
            duration: 400,
            useNativeDriver: true,
          }).start();
        }, 2500);
      });
    };

    // Set new goal
    const setNewGoal = async () => {
      try {
        if (!userId || !goal) {
          showNotification("Please enter a goal.", "error");
          return;
        }

        const response = await axios.post(
          `http://192.168.100.114:5001/set-goal/${userId}`,
          { goal }
        );

        setGoals((prev) => [...prev, response.data.data]); // add new goal to list
        setGoal("");
        showNotification("Goal has been set successfully!", "success");
      } catch (error) {
        console.error("Error setting goal:", error.response?.data || error.message);
        showNotification("Failed to set goal. Please try again.", "error");
      }
    };

    // Check goal status
    const checkGoals = async () => {
      try {
        if (!userId) {
          showNotification("Please log in first.", "error");
          return;
        }

        const response = await axios.get(
          `http://192.168.100.114:5001/check-goal/${userId}`
        );

        // assume response returns all goals with status
        setGoals(response.data.goals);
        showNotification("Goal status updated!", "success");
      } catch (error) {
        console.error("Error checking goals:", error.response?.data || error.message);
        showNotification("Failed to check goal. Please try again.", "error");
      }
    };

    // Delete a goal
    const deleteGoal = async (goalId) => {
      try {
        await axios.delete(
          `http://192.168.100.114:5001/delete-goal/${userId}/${goalId}`
        );
        setGoals((prev) => prev.filter((g) => g._id !== goalId));
        showNotification("Goal deleted successfully.", "success");
      } catch (error) {
        console.error("Error deleting goal:", error.response?.data || error.message);
        showNotification("Failed to delete goal.", "error");
      }
    };

    const renderGoalCard = ({ item }) => (
      <View style={styles.card}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.cardTitle}>🎯 {item.goal}</Text>
          <TouchableOpacity onPress={() => deleteGoal(item._id)}>
            <MaterialCommunityIcons
              name="delete"
              size={24}
              color="#F44336"
            />
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.status,
            item.isAchieved ? styles.achieved : styles.notAchieved,
          ]}
        >
          {item.isAchieved ? "🏆 Achieved" : "💪 Keep Going"}
        </Text>
      </View>
    );

    return (
      <View style={styles.container}>
        {/* Slide-down notification */}
        {notification.message ? (
          <Animated.View
            style={[
              styles.notification,
              notification.type === "success"
                ? styles.success
                : styles.error,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <Text style={styles.notificationText}>{notification.message}</Text>
          </Animated.View>
        ) : null}

        <Text style={styles.title}>🎯 Goal Tracker</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your goal"
          value={goal}
          onChangeText={setGoal}
        />

        <TouchableOpacity style={styles.button} onPress={setNewGoal}>
          <Text style={styles.buttonText}>Set Goal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={checkGoals}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            Check Achievements
          </Text>
        </TouchableOpacity>

        {/* List of goals */}
        <FlatList
          data={goals}
          keyExtractor={(item) => item._id}
          renderItem={renderGoalCard}
          style={{ marginTop: 20 }}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#F4F6FA",
    },
    title: {
      fontSize: 26,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
      color: "#3F51B5",
    },
    input: {
      height: 50,
      borderColor: "#ddd",
      borderWidth: 1,
      marginBottom: 15,
      paddingLeft: 15,
      borderRadius: 12,
      backgroundColor: "#fff",
      fontSize: 16,
      elevation: 2,
    },
    button: {
      backgroundColor: "#3F51B5",
      paddingVertical: 14,
      borderRadius: 12,
      marginBottom: 12,
      alignItems: "center",
      elevation: 3,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
    secondaryButton: {
      backgroundColor: "#fff",
      borderWidth: 1.5,
      borderColor: "#3F51B5",
    },
    secondaryButtonText: {
      color: "#3F51B5",
    },
    card: {
      backgroundColor: "#fff",
      padding: 16,
      marginBottom: 12,
      borderRadius: 12,
      elevation: 3,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: "#333",
    },
    status: {
      marginTop: 10,
      fontSize: 16,
      fontWeight: "500",
    },
    achieved: {
      color: "#4CAF50",
    },
    notAchieved: {
      color: "#F44336",
    },
    notification: {
      position: "absolute",
      top: 40,
      left: 20,
      right: 20,
      padding: 12,
      borderRadius: 10,
      zIndex: 10,
    },
    success: {
      backgroundColor: "#4CAF50",
    },
    error: {
      backgroundColor: "#F44336",
    },
    notificationText: {
      color: "#fff",
      fontSize: 15,
      fontWeight: "500",
      textAlign: "center",
    },
  });

  export default GoalAchievement;
