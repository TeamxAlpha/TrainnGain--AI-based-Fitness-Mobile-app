import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const NutritionScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [modalBgImage, setModalBgImage] = useState('');

  return (
    <>
      <Ionicons
        onPress={() => navigation.goBack()}
        style={{ position: 'absolute', top: 40, left: 20, backgroundColor: "white", borderRadius: 8, padding: 3 }}
        name="arrow-back-outline"
        size={24}
        color="black"
      />

      <View style={styles.container}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', marginBottom: 15 , borderBottomColor: "#4CAF50", }}>Nutritions</Text>
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <ImageBackground source={modalBgImage} style={styles.modalBackground}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalText}>{selectedText}</Text>
          </ImageBackground>
        </Modal>
        <TouchableOpacity style={styles.section} onPress={() => {
          setSelectedText('Hydration is critical for overall health and well-being, especially when it comes to exercise performance. Water plays a vital role in regulating body temperature, transporting nutrients, and flushing out toxins. Dehydration can impair physical and cognitive performance, so it is essential to stay adequately hydrated throughout the day, especially before, during, and after workouts. Aim to drink at least 8 glasses of water per day, and more if you are exercising or in hot weather.');
          setModalVisible(true);
          setModalBgImage(require("../assets/hydration.jpg"))
        }}>
          <Text style={styles.text}>Hydration</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.section} onPress={() => {
          setSelectedText('Meal planning involves preparing and organizing meals in advance to ensure that you have nutritious options readily available throughout the week. This can include batch cooking, portioning out meals into containers, and creating a shopping list based on your planned meals. Meal planning helps you make healthier choices, saves time and money, and reduces the likelihood of turning to convenience foods when you are hungry.');
          setModalVisible(true);
          setModalBgImage(require("../assets/mealPlan.jpg"))
        }}>
          <Text style={styles.text}>Meal Planning</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.section} onPress={() => {
          setSelectedText('When you are trying to lose weight, it is like putting your body on a budget. You want to eat fewer calories than your body uses up, creating a "deficit." To do this, focus on eating plenty of fruits, veggies, lean meats, and whole grains while cutting back on sugary drinks and processed foods. Exercise helps burn off extra calories and keeps your body healthy. Pay attention to portion sizes and drink lots of water to help you feel full. Remember, it is a journey, so be patient and stick with your healthy habits for the best results.');
          setModalVisible(true);
          setModalBgImage(require("../assets/lostWeight.jpg"))
        }}>
          <Text style={styles.text}>Losing Weight - Tips</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.section} onPress={() => {
          setSelectedText('When you want to gain weight, it is like adding extra fuel to the engine of your body. You need to eat more calories than your body burns every day. But it is not just about eating anything. You want to choose foods that give you lots of good stuff your body needs, like proteins, healthy fats, and carbs from whole grains, fruits, and veggies. Exercise, especially strength training like lifting weights, helps build muscle mass, which adds healthy weight. Take it slow, though, so your body can adjust comfortably. And do not forget to rest and recover between workouts.');
          setModalVisible(true);
          setModalBgImage(require("../assets/gainWeight.jpg"))
        }}>
          <Text style={styles.text}>Gaining Weight - Tips</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.section} onPress={() => {
          setSelectedText('Healthy eating habits are the foundation of a balanced diet that supports overall health and well-being. This includes consuming a variety of nutrient-dense foods such as fruits, vegetables, lean proteins, and whole grains. These foods provide essential vitamins, minerals, and antioxidants that help support immune function, energy levels, and recovery from exercise. By adopting healthy eating habits, you can fuel your body effectively and optimize your fitness performance.');
          setModalVisible(true);
          setModalBgImage(require("../assets/healthyEating.jpeg"))
        }}>
          <Text style={styles.text}>Healthy Eating Habits</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.section} onPress={() => {
          setSelectedText('Macronutrients are essential nutrients that our bodies require in large amounts for energy production, growth, and overall health. There are three primary macronutrients: carbohydrates, proteins, and fats. Carbohydrates are the primary source of energy, proteins for the body and are essential for muscle repair and growth, and fats play a role in hormone regulation and nutrient absorption. Understanding how to balance these macronutrients in your diet is crucial for achieving your fitness goals.');
          setModalVisible(true);
          setModalBgImage(require("../assets/macroNutrients.jpg"))
        }}>
          <Text style={styles.text}>Understanding Macronutrients</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.section} onPress={() => {
          setSelectedText('Nutrition plays a crucial role in optimizing exercise performance and recovery. Eating the right foods at the right times can help fuel your workouts, enhance muscle growth and repair, and reduce the risk of injury and fatigue. Before exercise, focus on consuming carbohydrates for energy and proteins for muscle repair. After exercise, prioritize protein-rich foods to support muscle recovery and replenish glycogen stores. Hydration is also essential before, during, and after workouts to maintain optimal performance.');
          setModalVisible(true);
          setModalBgImage(require("../assets/nutritionExcercise.jpg"))
        }}>
          <Text style={styles.text}>Nutrition for Exercise Performance</Text>
        </TouchableOpacity>

   

       


        

        
      </View>
    </>
  );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30, // Reduced padding at the top
    backgroundColor: 'white', // Light, neutral background color for a calm vibe
  },

  // Section container with better spacing and aesthetics
  section: {
    marginBottom: 20, // Reduced bottom margin for closer sections
    marginHorizontal: 25, // Adjusted margin for tighter layout
    backgroundColor: '#ffffff', // Clean white background for sections
    borderRadius: 10, // Slightly smaller rounded corners for a more compact look
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8, // Subtle shadow depth for floating effect
    paddingVertical: 16, // Comfortable but slightly reduced vertical padding
    paddingHorizontal: 20, // Slightly less horizontal padding
  },

  // Text style for section titles with emphasis
  text: {
    fontSize: 15, // Smaller font size for a more compact design
    fontWeight: 'bold', // Bold for clarity
    color: '#333333', // Dark gray color for text
    textAlign: 'center', // Center-aligning for better balance
    marginBottom: 10, // Reduced margin for a more compact layout
  },

  // Close button with a polished design
  closeButton: {
    position: 'absolute',
    top: 15, // Slightly reduced top margin for button position
    left: 15, // Adjusted for better alignment with screen edges
    backgroundColor: '#ffffff', // Clean white background for the button
    borderRadius: 50, // Circular button for a modern, stylish touch
    padding: 10, // Reduced padding for a smaller button
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 5, // Light shadow for a floating effect
    borderWidth: 1, // Subtle border for a polished look
    borderColor: '#ddd', // Soft border color to complement the design
  },

  // Modal text with larger font size for readability
  modalText: {
    fontSize: 20, // Slightly smaller font size for readability
    paddingBottom: 100, // Reduced padding to save space
    textAlign: 'center', // Center alignment for visual harmony
    paddingHorizontal: 20, // Reduced padding for better spacing
    color: '#444444', // Slightly lighter gray for a soft look
    fontFamily: 'Roboto', // Clean, modern font for a stylish feel
  },

  // Modal container with a sleek and modern design
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start', // Keeps content aligned at the top
    alignItems: 'center', // Center the content horizontally
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darker background with semi-transparency for focus
    padding: 25, // Reduced padding around the modal container
  },

  // Modal background with an improved aesthetic
  modalBackground: {
    flex: 1,
    justifyContent: 'center', // Centers the modal content vertically
    alignItems: 'center', // Aligns content to the center horizontally
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker and more prominent background
    borderRadius: 12, // Slightly smaller rounded edges for a cleaner look
  },
});

export default NutritionScreen;
