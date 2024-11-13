import React from 'react';
import { Text, View, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';

const recoveryData = [
    {
      title: 'Lower Back Pain',
      exercises: [
        "Cat-Cow Stretch",
        "Child's Pose",
        "Pelvic Tilts",
        "Knee-to-Chest Stretch"
      ],
      tips: [
        "Avoid heavy lifting and strenuous bending.",
        "Focus on stretches that help align the spine.",
        "Engage in low-impact activities like walking or swimming."
      ]
    },
    {
      title: 'Knee Pain',
      exercises: [
        "Hamstring Stretch",
        "Quad Stretch",
        "Straight Leg Raise",
        "Wall Sits"
      ],
      tips: [
        "Avoid high-impact exercises such as running or jumping.",
        "Use ice to reduce inflammation after activity.",
        "Strengthen supporting muscles like hamstrings and quads."
      ]
    },
    {
      title: 'Shoulder Pain',
      exercises: [
        "Cross-Body Shoulder Stretch",
        "Pendulum Stretch",
        "Chest Expansion",
        "Scapular Retraction"
      ],
      tips: [
        "Avoid overhead activities until pain subsides.",
        "Focus on gentle stretching and mobility exercises.",
        "Strengthen shoulder muscles once pain has decreased."
      ]
    },
    {
      title: 'Neck Pain',
      exercises: [
        "Neck Tilts",
        "Chin Tucks",
        "Neck Rotations",
        "Shoulder Shrugs"
      ],
      tips: [
        "Avoid prolonged sitting and maintain good posture.",
        "Use a supportive pillow while sleeping.",
        "Stretch regularly to relieve tension in neck muscles."
      ]
    },
    {
      title: 'Ankle Pain',
      exercises: [
        "Ankle Circles",
        "Toe Raises",
        "Calf Stretch",
        "Resistance Band Flexion"
      ],
      tips: [
        "Avoid running or jumping activities until healed.",
        "Use ice to reduce swelling and elevate the ankle.",
        "Wear supportive footwear and avoid uneven surfaces."
      ]
    },
    {
      title: 'Hip Pain',
      exercises: [
        "Hip Flexor Stretch",
        "Piriformis Stretch",
        "Butterfly Stretch",
        "Glute Bridge"
      ],
      tips: [
        "Avoid prolonged sitting and practice good posture.",
        "Strengthen surrounding muscles like glutes and core.",
        "Engage in low-impact activities like swimming."
      ]
    },
    {
      title: 'Wrist Pain',
      exercises: [
        "Wrist Flexor Stretch",
        "Wrist Extensor Stretch",
        "Prayer Stretch",
        "Ball Squeeze"
      ],
      tips: [
        "Limit activities that strain the wrist, like typing.",
        "Use ergonomic tools to support wrist posture.",
        "Apply ice to reduce inflammation after activity."
      ]
    },
    {
      title: 'Elbow Pain',
      exercises: [
        "Tricep Stretch",
        "Wrist Flexor Stretch",
        "Eccentric Wrist Extension",
        "Forearm Pronations with Dumbbell"
      ],
      tips: [
        "Avoid repetitive gripping and lifting heavy weights.",
        "Use a brace if needed for added support.",
        "Stretch and strengthen forearm muscles gradually."
      ]
    },
    {
      title: 'General Muscle Soreness',
      exercises: [
        "Foam Rolling",
        "Dynamic Stretching",
        "Light Walking",
        "Gentle Yoga Poses"
      ],
      tips: [
        "Hydrate well to flush out muscle by-products.",
        "Engage in light activity to promote blood flow.",
        "Take rest days to allow full muscle recovery."
      ]
    },
  ];
  

const RecoveryZoneScreen = () => {
    const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
        <TouchableOpacity>
            <Text style={styles.header} >Recovery Exercises</Text>
          {/* <Ionicons name="fitness-outline" size={24} color="black"  /> */}
          <Button buttonStyle={styles.button} onPress={() => navigation.navigate('RecoveryExercises')} title={"Exercises"}/>
        </TouchableOpacity> 
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Recovery Education</Text>
      </View>

      {recoveryData.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.subHeader}>Recommended Exercises:</Text>
          {section.exercises.map((exercise, idx) => (
            <Text key={idx} style={styles.listItem}>• {exercise}</Text>
          ))}
          <Text style={styles.subHeader}>Recovery Tips:</Text>
          {section.tips.map((tip, idx) => (
            <Text key={idx} style={styles.listItem}>• {tip}</Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    padding: 10,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    marginLeft:100,
    marginRight:100,
    marginBottom:10,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  listItem: {
    fontSize: 14,
    marginLeft: 10,
    marginTop: 5,
  }
});

export default RecoveryZoneScreen;
