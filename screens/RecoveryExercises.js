import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import bgimage from '../assets/recoverybg.jpg'

const exercisesData = [
    // Lower Back Pain Recovery Exercises
    {
        title: "Pelvic Tilt",
        description: "Lie on your back with knees bent and feet flat on the floor. Tighten your abdominal muscles, flattening your back against the floor. Hold for 5 seconds, then relax. Repeat 10-15 times.",
      },
      {
        title: "Bridge Exercise",
        description: "Lie on your back with knees bent. Lift your hips off the floor until your knees, hips, and shoulders form a straight line. Hold for 5 seconds, then lower down. Repeat 10 times.",
      },
      {
        title: "Knee-to-Chest Stretch",
        description: "Lie on your back and bring one knee to your chest, keeping the other leg bent or straight. Hold for 20-30 seconds, then switch legs. Repeat 2-3 times per leg.",
      },
    
      // Knee Pain Recovery Exercises
      {
        title: "Heel Slide",
        description: "Lie on your back with legs straight. Slide one heel toward your glutes, bending the knee, then slide back. Repeat 10-15 times per leg.",
      },
      {
        title: "Quad Sets",
        description: "Sit with legs straight in front of you. Tighten your thigh muscle, pressing the back of your knee toward the floor. Hold for 5 seconds and release. Repeat 10-15 times per leg.",
      },
      {
        title: "Calf Raises",
        description: "Stand with feet hip-width apart. Raise your heels to stand on your toes, then lower slowly. Repeat 15-20 times.",
      },
    
      // Shoulder Pain Recovery Exercises
      {
        title: "Pendulum Swing",
        description: "Bend at the waist, letting the injured arm hang down. Gently swing the arm in small circles, 10 times each direction. Increase the circle size gradually as pain allows.",
      },
      {
        title: "Shoulder Blade Squeeze",
        description: "Sit or stand with good posture. Squeeze shoulder blades together, holding for 5 seconds. Repeat 10-15 times.",
      },
      {
        title: "Wall Slide",
        description: "Stand with your back against a wall, elbows at 90 degrees, hands up. Slowly slide arms up the wall, then back down. Repeat 10-15 times.",
      },
    
      // Neck Pain Recovery Exercises
      {
        title: "Chin Tuck",
        description: "Sit or stand with good posture. Gently pull your chin back as if making a 'double chin.' Hold for 5 seconds, then relax. Repeat 10-15 times.",
      },
      {
        title: "Neck Side Bends",
        description: "Slowly tilt your head to the side, bringing your ear toward your shoulder. Hold for 15-20 seconds, then switch sides. Repeat 2-3 times per side.",
      },
      {
        title: "Neck Rotation",
        description: "Turn your head to one side, keeping your shoulders relaxed. Hold for 15-20 seconds, then switch sides. Repeat 2-3 times per side.",
      },
    
      // Ankle Pain Recovery Exercises
      {
        title: "Alphabet Exercise",
        description: "Sit and extend your leg out in front of you. Use your big toe to 'write' the alphabet in the air, moving your ankle. Repeat once or twice.",
      },
      {
        title: "Ankle Inversion/Eversion with Resistance Band",
        description: "Secure a resistance band to an anchor and around the ball of your foot. Gently move your foot inward and outward against the resistance. Repeat 10-15 times in each direction.",
      },
      {
        title: "Toe Raises",
        description: "Stand with feet flat on the floor. Lift your toes off the ground while keeping heels down. Hold for a moment, then lower toes back down. Repeat 10-15 times.",
      },
    
      // Hip Pain Recovery Exercises
      {
        title: "Hip Flexor Stretch",
        description: "Kneel on one knee, with the other leg in front and bent at 90 degrees. Lean forward slightly, feeling a stretch in the front of the hip. Hold for 20-30 seconds, then switch sides. Repeat 2-3 times.",
      },
      {
        title: "Clamshell",
        description: "Lie on your side with knees bent and stacked. Keep feet together and lift your top knee, then lower. Repeat 10-15 times per side.",
      },
      {
        title: "Glute Bridge",
        description: "Lie on your back with knees bent. Lift hips up, squeeze glutes, and hold for 5 seconds, then lower. Repeat 10-15 times.",
      },
    
      // Wrist Pain Recovery Exercises
      {
        title: "Wrist Flexor Stretch",
        description: "Extend one arm straight with your palm facing down. Gently pull back on your fingers with the other hand. Hold for 15-20 seconds, then switch sides. Repeat 2-3 times per side.",
      },
      {
        title: "Wrist Extensor Stretch",
        description: "Extend one arm with palm facing down. Use the other hand to gently pull the fingers toward the floor. Hold for 15-20 seconds, then switch sides. Repeat 2-3 times per side.",
      },
      {
        title: "Wrist Curl with Light Weight",
        description: "Hold a light weight (e.g., a can of soup). Rest your forearm on a table, palm facing up, and curl your wrist up. Repeat 10-15 times, then switch hands.",
      },
    
      // Elbow Pain Recovery Exercises
      {
        title: "Forearm Stretch",
        description: "Extend your arm, palm facing down. Use the opposite hand to pull the fingers down gently. Hold for 15-20 seconds, then switch sides. Repeat 2-3 times per side.",
      },
      {
        title: "Towel Twist",
        description: "Hold a towel with both hands and twist in opposite directions as if wringing it out. Repeat 10-15 times in each direction.",
      },
      {
        title: "Eccentric Wrist Extension",
        description: "Hold a light weight in your hand, palm facing down. Lower the weight slowly, then use your other hand to lift it back up. Repeat 10 times per hand.",
      },
    
      // General Muscle Soreness Recovery Exercises
      {
        title: "Foam Rolling",
        description: "Use a foam roller to massage sore muscles, spending about 1-2 minutes on each muscle group.",
      },
      {
        title: "Dynamic Stretching",
        description: "Gently move through full-body stretches, like arm circles or leg swings. Perform for 5-10 minutes to improve blood flow.",
      },
      {
        title: "Gentle Yoga Poses",
        description: "Try poses like Child’s Pose, Downward Dog, and Cobra to stretch and relax. Hold each pose for 20-30 seconds.",
      },
      {
        title: "Light Walking",
        description: "Take a short walk to encourage circulation and aid recovery.",
      },
];

const RecoveryExercise = () => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(null); 
  

  const startExercise = (index) => {
    setCurrentExerciseIndex(index);
  };


  const handleDone = () => {
    if (currentExerciseIndex < exercisesData.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      setCurrentExerciseIndex(null); 
    }
  };


  const handleSkip = () => {
    if (currentExerciseIndex < exercisesData.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      setCurrentExerciseIndex(null);
    }
  };

 
  const handleBack = () => {
    setCurrentExerciseIndex(null);
  };

  return (
    <View style={styles.container}>
         
      {currentExerciseIndex === null ? (

        <ScrollView>
            <Image source={bgimage} style={styles.topImage} />
          <Text style={styles.header}>Recovery Exercises</Text>
          {exercisesData.map((exercise, index) => (
            <View key={index} style={styles.exerciseItem}>
              <Text style={styles.exerciseTitle}>{exercise.title}</Text>
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => startExercise(index)}
              >
                <Text style={styles.buttonText}>Start</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      ) : (
        // Exercise session view
        <View style={styles.sessionContainer}>
          <Text style={styles.exerciseTitle}>
            {exercisesData[currentExerciseIndex].title}
          </Text>
          <Text style={styles.exerciseDescription}>
            {exercisesData[currentExerciseIndex].description}
          </Text>

          <View style={styles.sessionButtons}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
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
    fontWeight: 'bold',
    marginBottom: 20,
  },
  exerciseItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  topImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  startButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sessionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  exerciseDescription: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  sessionButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  backButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  skipButton: {
    padding: 10,
    backgroundColor: '#FFC107',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  doneButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default RecoveryExercise;
