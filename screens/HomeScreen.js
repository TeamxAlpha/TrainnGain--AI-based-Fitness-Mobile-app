import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FitnessItems } from '../Context';
import FitnessCards from '../components/FitnessCards';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatBot from './ChatBot';

const tipsAndTricks = [
  "Stay hydrated throughout your workout.",
  "Remember to warm up before starting your workout.",
  "Focus on form to avoid injuries.",
  "Take rest days to help muscles recover.",
  "Gradually increase your workout intensity.",
  "Fuel your body with nutritious food.",
  "Set realistic and achievable fitness goals.",
  "Track your progress to stay motivated.",
  "Get enough sleep to aid muscle recovery.",
  "Include strength training in your routine.",
  "Mix up your exercises to prevent boredom.",
  "Stretch after workouts to improve flexibility.",
  "Listen to your body and avoid overtraining.",
  "Workout with a friend for added motivation.",
  "Celebrate small victories in your fitness journey.",
  "Make time for mental relaxation to reduce stress.",
  "Don't skip meals; fuel your workouts adequately.",
  "Add variety to your cardio exercises.",
  "Practice proper breathing techniques.",
  "Aim for consistent, gradual progress.",
  "Start with lighter weights and work your way up.",
  "Wear comfortable and supportive workout attire.",
  "Set both short-term and long-term fitness goals.",
  "Incorporate core exercises for stability.",
  "Avoid comparing your progress to others.",
  "Use a foam roller to relieve sore muscles.",
  "Reduce screen time before bed for better sleep.",
  "Plan your workouts to fit your weekly schedule.",
  "Challenge yourself but know your limits.",
  "Take deep breaths to stay calm and focused.",
];

const HomeScreen = () => {
  const [showIcon, setShowIcon] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { calories, minutes, workout } = useContext(FitnessItems);
  const navigation = useNavigation();

  useEffect(() => {
    const showTipOnce = async () => {
      await AsyncStorage.removeItem('hasSeenTip');
      const randomIndex = Math.floor(Math.random() * tipsAndTricks.length);
      const randomTip = tipsAndTricks[randomIndex];
      Alert.alert("Tip of the Day", randomTip, [{ text: "Got it!" }]);
      await AsyncStorage.setItem('hasSeenTip', 'true');
    };

    showTipOnce();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20 }}>
      <View style={{ backgroundColor: "#000000d7", paddingTop: 40, paddingHorizontal: 20, height: 160, width: "100%" }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 50 }}>
          <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
            <Ionicons name="menu-outline" size={24} color="white" />
          </TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={require('../assets/logo.png')} style={{ width: 30, height: 30, marginRight: 10 }} />
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>Train & Gain</Text>
          </View>

          {/* Dark Mode */}
          <TouchableOpacity onPress={() => setShowIcon(!showIcon)}>
            {showIcon ? <Ionicons name="sunny" size={24} color="white" /> : <Ionicons name="moon" size={24} color="white" />}
          </TouchableOpacity>
        </View>

        {/* Cards Row */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 30 }}>
          {/* First Card */}
          <View style={styles.shadowCards}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{calories.toFixed(2)}</Text>
            <Text>KCAL</Text>
          </View>

          {/* Second Card */}
          <View style={styles.shadowCards}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{workout}</Text>
            <Text>WORKOUTS</Text>
          </View>

          {/* Third Card */}
          <View style={styles.shadowCards}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{minutes}</Text>
            <Text>MINUTES</Text>
          </View>
        </View>
      </View>
      {showMenu && <Menu onClose={() => setShowMenu(false)} />}
      <FitnessCards />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CustomWorkout')}>
        <MaterialCommunityIcons name="pencil" size={24} color="black" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const Menu = ({ onClose }) => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const getUserName = async () => {
      try {
        const name = await AsyncStorage.getItem('name');
        if (name) {
          setUserName(name);
        } else {
          setUserName(null);
        }
      } catch (error) {
        console.error('Failed to fetch the user name from AsyncStorage', error);
      }
    };

    getUserName();

    const interval = setInterval(() => {
      getUserName();
    }, 2000);

    return () => clearInterval(interval);
  }, [setUserName]);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('name');
              setUserName(null);
            } catch (error) {
              console.error('Failed to log out', error);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const showRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * tipsAndTricks.length);
    const randomTip = tipsAndTricks[randomIndex];
    Alert.alert("Tip of the Day", randomTip, [{ text: "Got it!" }]);
  };

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.menuContainer}>
        {/* Welcome Section */}
        <View style={styles.userContainer}>
          {userName ? (
            <>
              <Text style={styles.menuName}>Welcome, {userName}</Text>
              <TouchableOpacity onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={24} color="black" />
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.menuName}>Welcome to Train & Gain</Text>
          )}
        </View>

        {/* Menu Items */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Nutrition')}>
          <Text style={styles.menuText}>Nutrition Guidance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ProgressTracking')}>
          <Text style={styles.menuText}>Progress Tracking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={showRandomTip}>
          <Text style={styles.menuText}>Tips & Tricks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('RecoveryZone')}>
          <Text style={styles.menuText}>Recovery Zone</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('BiceupCheck')}>
          <Text style={styles.menuText}>Biceup Check</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ChatBot')}>
          <Text style={styles.menuText}>Chat with Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Calorieplanner')}>
          <Text style={styles.menuText}>Calorie Planner</Text>
        </TouchableOpacity>

        {/* Conditional Rendering for Login and Signup */}
        {!userName && (
          <>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.menuText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.menuText}>Signup</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Close Menu */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  shadowCards: {
    backgroundColor: "white",
    width: "32%",
    height: 80,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "80%",
    height: "150%",
    backgroundColor: "white",
    zIndex: 100,
    paddingTop: 60,
    paddingLeft: 20,
    paddingRight: 10,
  },
  menuItem: {
    paddingVertical: 15, // Reduced vertical padding for a more compact layout
    paddingLeft: 30, // Slightly smaller padding for the arrow icon space
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    position: "relative", // For positioning the arrow
    marginBottom: 8, // Reduced margin between items
    backgroundColor: "#f9f9f9", // Light background for better contrast
    borderRadius: 6, // Slightly smaller border radius for a subtler rounded look
    transition: "background-color 0.3s ease, transform 0.3s ease", // Smooth transition for hover effects
  },
  menuItemHover: {
    opacity: 0.8, // Slight occlusion effect on hover
    backgroundColor: "#e9e9e9", // Subtle background change on hover
    transform: [{ scale: 1.05 }], // Slight zoom-in effect for interactivity
  },

  // Text Style for Menu Items (Legible and Bold)
  menuText: {
    fontSize: 16, // Smaller text size for a more compact look
    fontWeight: '500', // Semi-bold for emphasis
    color: "#333", // Dark text color for contrast
  },

  // Menu Name Style with an underline to highlight the section
  menuName: {
    fontSize: 18, // Slightly smaller font size for the title
    fontWeight: '700', // Bold for better prominence
    borderBottomWidth: 2,
    borderBottomColor: "#4CAF50", // Use a vibrant color for emphasis
    marginBottom: 15, // Reduced margin for compactness
    paddingBottom: 8, // Slightly smaller padding for the underline effect
    color: "#333", // Dark text for contrast
  },

  // Close Button: Floating and easy to locate with some padding
  closeButton: {
    position: "absolute",
    top: 12, // Adjusted top position for closer alignment
    right: 12, // Adjusted right position for better fit
    backgroundColor: "white", // White background for the button
    padding: 8, // Slightly smaller padding around the icon
    borderRadius: 50, // Circular shape for the close button
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6, // Adding shadow for a floating effect
  },

  // Button Style: Modern floating action button with a clean design
  button: {
    position: 'absolute',
    bottom: 25, // Adjusted bottom position for a more compact look
    right: 25, // Adjusted right position for better alignment
    backgroundColor: '#4CAF50', // Green button for a pop of color
    borderRadius: 50, // Circular button
    width: 50, // Smaller button size
    height: 50, // Smaller button size
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10, // Strong shadow for floating effect
  },

  // User Info Section: Clear and spaced out for neatness
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 12, // Reduced padding for a more compact look
    paddingHorizontal: 18, // Slightly smaller horizontal padding
    backgroundColor: "#fff", // Clean white background for clarity
    borderBottomWidth: 1, // Reduced bottom border width
    borderBottomColor: "#f0f0f0", // Light border to separate sections
  },

  // Adding transition to the hover effect for the menu items
  menuItemArrow: {
    position: 'absolute',
    left: 8, // Adjusted left margin for the arrow icon
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: 16, // Slightly smaller font size for the arrow
    color: "#4CAF50", // Green arrow for visual contrast
    transition: 'all 0.3s ease', // Smooth transition for hover effects
  },
});

export default HomeScreen;
