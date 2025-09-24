import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const NutritionScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");

  const topics = [
    {
      title: "Hydration",
      text: "Hydration is critical for health and exercise. Drink at least 8 glasses of water daily, more if exercising or in hot weather.",
      color: "#4CAF50",
      icon: "water",
    },
    {
      title: "Meal Planning",
      text: "Prepare meals in advance for better nutrition. Batch cook, portion meals, and make a shopping list.",
      color: "#FF9800",
      icon: "food-variant",
    },
    {
      title: "Losing Weight",
      text: "Eat fewer calories than you burn. Focus on fruits, vegetables, lean proteins, and whole grains.",
      color: "#F44336",
      icon: "run",
    },
    {
      title: "Gaining Weight",
      text: "Eat more calories than you burn. Choose proteins, healthy fats, and complex carbs. Combine with strength training.",
      color: "#2196F3",
      icon: "weight-lifter",
    },
    {
      title: "Healthy Eating Habits",
      text: "Eat nutrient-dense foods: fruits, vegetables, lean proteins, whole grains. Supports energy and recovery.",
      color: "#9C27B0",
      icon: "food-apple",
    },
    {
      title: "Macronutrients",
      text: "Carbs provide energy, proteins repair muscles, fats regulate hormones. Balance is key.",
      color: "#FF5722",
      icon: "chart-pie",
    },
    {
      title: "Nutrition for Exercise",
      text: "Fuel workouts and recovery with proper nutrients. Pre-workout: carbs. Post-workout: protein. Stay hydrated.",
      color: "#607D8B",
      icon: "run-fast",
    },
  ];

  const openModal = (topic) => {
    setSelectedText(topic.text);
    setSelectedTitle(topic.title);
    setSelectedIcon(topic.icon);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back-outline" size={24} color="#333" />
      </TouchableOpacity>

      <Text style={styles.header}>Nutrition</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {topics.map((topic, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.card, { borderLeftColor: topic.color }]}
            onPress={() => openModal(topic)}
          >
            <MaterialCommunityIcons
              name={topic.icon}
              size={24}
              color={topic.color}
              style={{ marginRight: 10 }}
            />
            <Text style={styles.cardTitle}>{topic.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="arrow-back-outline" size={24} color="#333" />
            </TouchableOpacity>
            <ScrollView>
              <Text style={styles.modalHeader}>{selectedTitle}</Text>
              <MaterialCommunityIcons
                name={selectedIcon}
                size={36}
                color="#3F51B5"
                style={{ alignSelf: "center", marginVertical: 10 }}
              />
              <Text style={styles.modalText}>{selectedText}</Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 80,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 80,
    left: 15,
    zIndex: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: "600",
    color: "#3F51B5",
    marginBottom: 50,
  },
  scrollContainer: {
    paddingBottom: 20,
    width: "95%",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  modalBox: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    maxHeight: "80%",
  },
  closeButton: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 2,
  },
  modalHeader: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    color: "#3F51B5",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
    textAlign: "justify",
  },
});

export default NutritionScreen;
