import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView,ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import bgImage from '../assets/Customworkouts.jpg';  
import Icon from 'react-native-vector-icons/FontAwesome';  
import { color } from 'react-native-elements/dist/helpers';
 
const CustomWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    // Simulating fetching data from customworkouts.js
    const customWorkoutsData = [
      { 
        id: "0",
        name: "FULL BODY",
        description: "7x4 CHALLENGE",
        exercises: [
          {
            id: "10",
            name: "JUMPING JACKS",
            sets: 12,
          },
          {
            id: "11",
            name: "INCLINED PUSH-UPS",
            sets: 10,
          },
          {
            id: "12",
            name: "WIDE ARM PUSH-UPS",
            sets: 12,
          },
          {
            id: "13",
            name: "COBRA STRETCH",
            sets: 10,
          },
          {
            id: "14",
            name: "CHEST STRETCH",
            sets: 10,
          }
        ]
      },
      {
        id: "1",
        name: "ABS BEGINNER",
        description: "7x4 CHALLENGE",
        exercises: [
          {
            id: "90",
            name: "JUMPING JACKS",
            sets: 12,
          },
          {
            id: "91",
            name: "MOUNTAIN CLIMBERS",
            sets: 10,
          },
          {
            id: "92",
            name: "HEEL TOUCH",
            sets: 20,
          },
          {
            id: "94",
            name: "PLANK",
            sets: 10,
          },
          {
            id: "95",
            name: "LEG RAISES",
            sets: 14,
          }
        ]
      },{
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
      },
      
    ];

    setWorkouts(customWorkoutsData);
  }, []);
  
  const addToCustomPlan = (exerciseId) => {
    // Implement your logic here to add exercise to custom plan
    console.log('Exercise added to custom plan:', exerciseId);
  };

  return (
    <ImageBackground source={bgImage} style={styles.backgroundImage}>
      <ScrollView style={styles.container}>
        {workouts.map(workout => (
          <View key={workout.id} style={styles.workoutContainer}>
            <Text style={styles.title}>{workout.name}</Text>
            <Text style={styles.description}>{workout.description}</Text>
            <View style={styles.exercisesContainer}>
              {workout.exercises.map(exercise => (
                <View key={exercise.id} style={styles.exerciseContainer}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <Text style={{color:'white'}}>Sets: {exercise.sets}</Text>
                  <TouchableOpacity onPress={() => addToCustomPlan(exercise.id)} style={styles.addButton}>
                    <Icon name="plus" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
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
    width: '48%', // Adjust as needed to fit two items per row with some spacing
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)', // White color with 70% opacity
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
    alignItems: 'center', // Center the icon horizontally
  },
});

export default CustomWorkouts;