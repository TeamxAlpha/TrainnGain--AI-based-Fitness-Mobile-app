import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    fetchUserProfile();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const email = await AsyncStorage.getItem("email");
      const name = await AsyncStorage.getItem("name");
      const userId = await AsyncStorage.getItem("userId"); // ✅ fetch saved userId
      
      if (!email || !userId) return;

      setUserData({
        userId, // ✅ add id to profile
        name,
        email,
        age: 23,
        gender: "Male",
        weight: "72kg",
        goal: "Lose 3kg in 4 weeks",
        workoutsCompleted: 45,
        totalWorkoutHours: 23,
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  if (!userData) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Ionicons
        name="arrow-back"
        size={28}
        color="#3F51B5"
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.scrollView}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <Avatar
            rounded
            size="xlarge"
            icon={{ name: "user", type: "font-awesome" }}
            containerStyle={styles.avatar}
          />

          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.email}>{userData.email}</Text>

          <View style={styles.statsContainer}>
            <ProfileStat icon="id-badge" label="User ID" value={userData.userId} />
            <ProfileStat icon="calendar" label="Age" value={userData.age} />
            <ProfileStat icon="venus-mars" label="Gender" value={userData.gender} />
            <ProfileStat icon="weight" label="Weight" value={userData.weight} />
            <ProfileStat icon="bullseye" label="Goal" value={userData.goal} />
            <ProfileStat icon="dumbbell" label="Workouts Done" value={userData.workoutsCompleted} />
            <ProfileStat icon="clock" label="Total Hours" value={`${userData.totalWorkoutHours} hrs`} />
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const ProfileStat = ({ icon, label, value }) => (
  <View style={styles.statRow}>
    <FontAwesome5 name={icon} size={20} color="#3F51B5" style={{ width: 30 }} />
    <Text style={styles.statLabel}>{label}:</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6FA" },
  scrollView: {
    flexGrow: 1,
    backgroundColor: "#F4F6FA",
    alignItems: "center",
    paddingVertical: 40,
  },
  avatar: {
    alignSelf: "center",
    top: 50,
    backgroundColor: "#ccc",
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    top: 30,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#333",
  },
  email: {
    color: "#777",
    top: 30,
    alignSelf: "center",
    marginBottom: 20,
    fontSize: 16,
  },
  statsContainer: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
    top: 30,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    elevation: 4,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  statLabel: {
    fontSize: 16,
    fontWeight: "600",
    alignSelf: "center",
    marginLeft: 10,
    color: "#333",
  },
  statValue: {
    fontSize: 16,
    marginLeft: 5,
    color: "#3F51B5",
    fontWeight: "500",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: "white",
    borderRadius: 30,
    padding: 8,
    elevation: 5,
  },
});
