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
          setSelectedText('Macronutrients are essential nutrients that our bodies require in large amounts for energy production, growth, and overall health. There are three primary macronutrients: carbohydrates, proteins, and fats. Carbohydrates are the primary source of energy, proteins for the body and are essential for muscle repair and growth, and fats play a role in hormone regulation and nutrient absorption. Understanding how to balance these macronutrients in your diet is crucial for achieving your fitness goals.');
          setModalVisible(true);
          setModalBgImage(require("../assets/macroNutrients.jpg"))
        }}>
          <Text style={styles.text}>Understanding Macronutrients</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.section} onPress={() => {
          setSelectedText('Healthy eating habits are the foundation of a balanced diet that supports overall health and well-being. This includes consuming a variety of nutrient-dense foods such as fruits, vegetables, lean proteins, and whole grains. These foods provide essential vitamins, minerals, and antioxidants that help support immune function, energy levels, and recovery from exercise. By adopting healthy eating habits, you can fuel your body effectively and optimize your fitness performance.');
          setModalVisible(true);
          setModalBgImage(require("../assets/healthyEating.jpeg"))
        }}>
          <Text style={styles.text}>Healthy Eating Habits</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.section} onPress={() => {
          setSelectedText('Meal planning involves preparing and organizing meals in advance to ensure that you have nutritious options readily available throughout the week. This can include batch cooking, portioning out meals into containers, and creating a shopping list based on your planned meals. Meal planning helps you make healthier choices, saves time and money, and reduces the likelihood of turning to convenience foods when you are hungry.');
          setModalVisible(true);
          setModalBgImage(require("../assets/mealPlan.jpg"))
        }}>
          <Text style={styles.text}>Meal Planning</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.section} onPress={() => {
          setSelectedText('Hydration is critical for overall health and well-being, especially when it comes to exercise performance. Water plays a vital role in regulating body temperature, transporting nutrients, and flushing out toxins. Dehydration can impair physical and cognitive performance, so it is essential to stay adequately hydrated throughout the day, especially before, during, and after workouts. Aim to drink at least 8 glasses of water per day, and more if you are exercising or in hot weather.');
          setModalVisible(true);
          setModalBgImage(require("../assets/hydration.jpg"))
        }}>
          <Text style={styles.text}>Hydration</Text>
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
    paddingTop: 20,
  },
  section: {
    marginBottom: 25,
    marginHorizontal: 30,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  modalText: {
    fontSize: 20,
    paddingBottom: 150,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NutritionScreen;
