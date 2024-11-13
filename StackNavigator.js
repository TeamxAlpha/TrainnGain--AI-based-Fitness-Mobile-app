import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import WorkoutScreen from './screens/WorkoutScreen';
import FitScreen from './screens/FitScreen';
import RestScreen from './screens/RestScreen';
import NutritionScreen from './screens/Nutrition';
import Login from "./screens/LoginScreen";
import Signup from './screens/SignupScreen';
import CustomWorkout from './screens/CustomWorkouts';
import StartWorkout from './screens/StartWorkout';
import GoalAchievement from './screens/GoalAchievement';
import PerformanceAnalytics from './screens/PerformanceAnalytics';
import ProgressTracking from './screens/ProgressTracking';
import BicepCurlCheck from './screens/BicepCurl';
import RecoveryZoneScreen from './screens/RecoveryZone';
import RecoveryExercises from './screens/RecoveryExercises';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Workout" component={WorkoutScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Fit" component={FitScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Rest" component={RestScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Nutrition" component={NutritionScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="Signup" component={Signup} />
        <Stack.Screen options={{ headerShown: false }} name="CustomWorkout" component={CustomWorkout} />
        <Stack.Screen option={{ headerShown: false }} name="StartWorkout" component={StartWorkout} />
        <Stack.Screen option={{ headerShown: false }} name="BiceupCheck" component={BicepCurlCheck} />
        <Stack.Screen option= {{ headerShown: false }} name="GoalAchievement" component={GoalAchievement} />
        <Stack.Screen option= {{ headerShown: false }} name="PerformanceAnalytics" component={PerformanceAnalytics} />
        <Stack.Screen option= {{ headerShown: false }} name="ProgressTracking" component={ProgressTracking} />
        <Stack.Screen option={{headerShown: false}} name="RecoveryZone" component={RecoveryZoneScreen}/>
        <Stack.Screen option={{headerShown: false}} name="RecoveryExercises" component={RecoveryExercises}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
} 

export default StackNavigator;
