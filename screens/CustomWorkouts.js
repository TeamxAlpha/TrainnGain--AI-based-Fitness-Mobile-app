import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet, TouchableOpacity, Button, ToastAndroid } from 'react-native';
import bgImage from '../assets/Customworkouts.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomWorkouts = ({ navigation }) => { 
  const [workouts, setWorkouts] = useState([]);
  const [customPlan, setCustomPlan] = useState([]);
  const [email, setEmail] = useState('')

  useEffect(() => {
    const customWorkoutsData = [
      {
        id: "0",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrEM-6gDUO7g1cdrNhBaqk_0nwxy6ILlIqsQ&usqp=CAU",
        name: "FULL BODY",
        description: "7x4 CHALLENGE",
        exercises: [
          {
            id: "10",
            image:
              "https://sworkit.com/wp-content/uploads/2020/06/sworkit-jumping-jack.gif",
            name: "JUMPING JACKS",
            sets: 12,
          },
          {
            id: "11",
            image: "https://media.self.com/photos/583c641ca8746f6e65a60c7e/master/w_1600%2Cc_limit/DIAMOND_PUSHUP_MOTIFIED.gif",
            name: "INCLINED PUSH-UPS",
            sets: 10,
          },
          {
            id: "12",
            image: "https://cdn.prod.openfit.com/uploads/2020/03/10162714/wide-arm-push-up.gif",
            name: "WIDE ARM PUSH-UPS",
            sets: 12,
          },
          {
            id: "13",
            image: "https://www.yogajournal.com/wp-content/uploads/2021/12/Cobra.gif?width=730",
            name: "COBRA STRETCH",
            sets: 10,
          },
          {
            id: "14",
            image: "https://www.vissco.com/wp-content/uploads/animation/sub/double-knee-to-chest-stretch.gif",
            name: "CHEST STRETCH",
            sets: 10,
          }
        ],
      },
      {
        id: "1",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRonpSjpGQ2-JD8-XFFD7LYsVSFCOiASj0wSOq1qxNvxGFHe7W6AU1LRAeJ2fOIzYICMGc&usqp=CAU",
        name: "ABS BEGINNER",
        description: "7x4 CHALLENGE",
        exercises: [
          {
            id: "90",
            image: "https://media1.popsugar-assets.com/files/thumbor/f2sbzQY1h1zqiGEV9Mhr1IAcFMU/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2017/03/13/796/n/1922729/19cf2a4428446429_EXAMPLE.crossjacks.gif",
            name: "JUMPING JACKS",
            sets: 12,
          },
          {
            id: "91",
            image: "https://i.pinimg.com/originals/18/27/be/1827be178c019b1dc6f8a8d8b4a7b0b8.gif",
            name: "MOUNTAIN CLIMBERS",
            sets: 10,
          },
          {
            id: "92",
            image: "https://i.pinimg.com/originals/f4/b0/f3/f4b0f3093fcadd64968e4c46d1767b50.gif",
            name: "HEEL TOUCH",
            sets: 20,
          },
          {
            id: "94",
            image: "https://i.pinimg.com/originals/cf/b5/67/cfb5677a755fe7288b608a4fec6f09a0.gif",
            name: "PLANK",
            sets: 10,
          },
          {
            id: "95",
            image: "https://www.gymguider.com/wp-content/uploads/2017/10/straight-leg-raise.gif",
            name: "LEG RAISES",
            sets: 14,
          }
        ]
      },
      {
        id: "2",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1NHvoutGn-Vr_uwVbOOtezhENvx9jhV6pfQ&usqp=CAU",
        name: "ARM BEGINNER",
        description: "7x4 CHALLENGE",
        exercises: [
          {
            id: "70",
            image: "https://post.healthline.com/wp-content/uploads/2020/06/400x400_How_to_do_Zac_Efrons_Baywatch_Workout_Dumbbell_Lateral_Raise.gif",
            name: "ARM RAISES",
            sets: 8,
          },
          {
            id: "71",
            image: "https://thumbs.gfycat.com/CompleteZigzagFossa-max-1mb.gif",
            name: "TRICEP DIPS",
            sets: 10,
          },
          {
            id: "72",
            image: "https://thumbs.gfycat.com/MisguidedAridAlaskanmalamute-max-1mb.gif",
            name: "DIAMOND PUSHUP",
            sets: 10,
          },
          {
            id: "73",
            image: "https://c.tenor.com/gI-8qCUEko8AAAAC/pushup.gif",
            name: "PUSH-UPS",
            sets: 10,
          },
          {
            id: "74",
            image: "https://i.pinimg.com/originals/8c/53/27/8c532774e4e1c524576bf1fb829ad895.gif",
            name: "DUMBELL CURL",
            sets: 11,

          },
          {
            id: "75",
            image: "https://www.vissco.com/wp-content/uploads/animation/sub/inch-worm.gif",
            name: "INCH WORMS",
            sets: 5,
          },
          {
            id: "76",
            image: "https://c.tenor.com/jqwaOmRs-7gAAAAC/tricep-kick-back-tricep.gif",
            name: "TRICEP LIFT",
            sets: 8,
          }
        ]
      },
      {
        id: "3",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqCT0tewpNAZ6R9JUoMDHIHGnpE44U2Fl1Zw&usqp=CAU",
        name: "CHEST BEGINNER",
        description: "7x4 CHALLENGE",
        exercises: [
          {
            id: "20",
            image: "https://i.pinimg.com/originals/ff/cf/40/ffcf40474f0758dfedebc823f5532aa1.gif",
            name: "DECLINE PUSH-UPS",
            sets: 9,
          },
          {
            id: "21",
            image: "https://image.2bstronger.com/article/fitness/the-14-toughest-do-anywhere-workout-moves-56348/1006.gif",
            name: "HINDU PUSH-UPS",
            sets: 10,
          },
          {
            id: "22",
            image: "https://thumbs.gfycat.com/TheseRigidBorer-size_restricted.gif",
            name: "SHOULDER STRETCH",
            sets: 5,
          },
          {
            id: "23",
            image: "https://thumbs.gfycat.com/AlertAfraidAldabratortoise-max-1mb.gif",
            name: "COBRA STRETCH",
            sets: 4,
          },
          {
            id: "25",
            image: "https://media4.popsugar-assets.com/files/thumbor/BaWEAcCjtJEjiwf3PqJHnZ_S23A/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2016/08/10/766/n/1922729/1eae2dcf3d395379_PushUpTwist.gif",
            name: "PUSH-UP & ROTATION",
            sets: 12,
          },
          {
            id: "26",
            image: "https://media3.popsugar-assets.com/files/thumbor/0Xiqpo7pxrKz5CKcRl7XYrKegko/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2014/02/27/847/n/1922729/1baf9ec0f5ce4ea9_burpee.3.gif",
            name: "BURPEES",
            sets: 10
          }
        ]
      }
    ];

    setWorkouts(customWorkoutsData);
  }, []);

  useEffect(() => {
    const getEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        if (email) {
          setEmail(email);
        } else {
          setEmail(null);
        }
      } catch (error) {
        console.error('Failed to fetch the email from AsyncStorage', error);
      }
    };
    getEmail();

    const interval = setInterval(() => {
      getEmail();
    }, 2000);

    return () => clearInterval(interval);
  }, [setEmail]);

  const addToCustomPlan = (exerciseId) => {
    const selectedExercise = workouts.flatMap(workout => workout.exercises).find(exercise => exercise.id === exerciseId);
    if (selectedExercise) {
      const exerciseAlreadyAdded = customPlan.find(exercise => exercise.id === selectedExercise.id);
      if (exerciseAlreadyAdded) {
        ToastAndroid.showWithGravity(
          `Workout already added to custom plan: ${selectedExercise.name}`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      } else {
        const exerciseData = {
          email: email,
          exercise: {
            id: selectedExercise.id,
            name: selectedExercise.name,
            image: selectedExercise.image,
            sets: selectedExercise.sets,
          }
        };

        setCustomPlan([...customPlan, selectedExercise]);
        axios.post('http://192.168.137.1:5001/custom-plans', exerciseData) //Zohaib's 192.168.137.1, Mahdi's 192.168.100.8
          .then(response => {
            ToastAndroid.showWithGravity(
              `Workout added to custom plan: ${selectedExercise.name}`,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
            console.log('Exercise added to custom plan:', response.data);
          })
          .catch(error => {
            console.error('Error adding exercise to custom plan:', error);
            ToastAndroid.showWithGravity(
              `Error adding workout to custom plan: ${error.message}`,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
          });
      }
    }
  };

  const startWorkout = () => {
    navigation.navigate('StartWorkout', { customPlan });
  };

  return (
    <ImageBackground source={bgImage} style={styles.backgroundImage}>
      <Ionicons
        onPress={() => navigation.navigate('Home')}
        style={{ position: 'absolute', top: 40, left: 10, backgroundColor: "white", borderRadius: 8, padding: 3 }}
        name="arrow-back-outline"
        size={24}
        color="black"
      />

      <ScrollView style={styles.container}>
        {workouts.map(workout => (
          <View key={workout.id} style={styles.workoutContainer}>
            <Text style={styles.title}>{workout.name}</Text>
            <Text style={styles.description}>{workout.description}</Text>
            <View style={styles.exercisesContainer}>
              {workout.exercises.map(exercise => (
                <View key={exercise.id} style={styles.exerciseContainer}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <Text style={{ color: 'white' }}>Sets: {exercise.sets}</Text>
                  <TouchableOpacity onPress={() => addToCustomPlan(exercise.id)} style={styles.addButton}>
                    <Icon name="plus" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.startButton} onPress={startWorkout}>
        <Text style={styles.startButtonText}>Start Workout</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  workoutContainer: {
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  description: {
    marginBottom: 10,
    color: 'white',
  },
  exercisesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  exerciseContainer: {
    width: '48%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  exerciseName: {
    fontWeight: 'bold',
    color: 'white',
  },
  setsText: {
    color: 'white',
  },
  addButton: {
    backgroundColor: 'gray',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    margin: 20,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomWorkouts;
