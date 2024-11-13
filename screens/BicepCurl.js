import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { CameraType } from 'expo-camera/build/legacy/Camera.types';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/pose-detection';

const BicepCurlCheck = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [isPoseCorrect, setIsPoseCorrect] = useState(null);
  const [model, setModel] = useState(null);
  const [cameraType, setCameraType] = useState(CameraType.back);

  useEffect(() => {
    console.log("CAMERRAAA", cameraType, "Permission: ", hasPermission);

    const loadModel = async () => {
      await tf.ready();
      const loadedModel = await posenet.load();
      setModel(loadedModel);
    };
    loadModel();

    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const calculateAngle = (a, b, c) => {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    const angle = Math.abs(radians * (180 / Math.PI));
    return angle > 180 ? 360 - angle : angle;
  };

  const checkBicepCurl = (landmarks) => {
    const elbow = landmarks[7];
    const shoulder = landmarks[5];
    const wrist = landmarks[9];

    const angle = calculateAngle(shoulder, elbow, wrist);
    if (angle >= 150 && angle <= 180) {
      setIsPoseCorrect(true);
      Alert.alert("Good job!", "You are doing the bicep curl correctly.");
    } else {
      setIsPoseCorrect(false);
      Alert.alert("Try again", "Adjust your arm position.");
    }
  };

  const startPoseDetection = async () => {
    if (cameraRef && model) {
      const frame = await cameraRef.takePictureAsync();
      const image = await tf.browser.fromPixels(frame);
      const pose = await model.estimateSinglePose(image);
      const landmarks = pose.keypoints;

      if (pose && landmarks.length > 0) {
        checkBicepCurl(landmarks);
      }
    }
  };

  const toggleCamera = () => {
    setCameraType(prevType =>
      prevType === CameraType.front
        ? CameraType.back
        : CameraType.front
    );
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bicep Curl Form Check</Text>
      {hasPermission && Camera.Constants && (
        <Camera
          style={styles.camera}
          type={cameraType}
          ref={setCameraRef}
        >
          <View style={styles.overlay}>
            <TouchableOpacity style={styles.checkButton} onPress={startPoseDetection}>
              <Text style={styles.checkButtonText}>Check Bicep Curl</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toggleButton} onPress={toggleCamera}>
              <Text style={styles.toggleButtonText}>Toggle Camera</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
      {isPoseCorrect !== null && (
        <Text style={styles.result}>
          {isPoseCorrect ? "Form is Correct!" : "Form is Incorrect!"}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  camera: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 30,
  },
  checkButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleButton: {
    backgroundColor: '#FF5722',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  toggleButtonText: {
    color: 'white',
    fontSize: 16,
  },
  result: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default BicepCurlCheck;


// import React, { useState, useEffect } from 'react';
// import { View, Text, Button } from 'react-native';
// import { Camera } from 'expo-camera';
// import { CameraType } from 'expo-camera/build/legacy/Camera.types';
// // import { CameraType } from 'expo-camera/build/legacy/Camera.types';

// export default function BicepCurlCheck() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [cameraRef, setCameraRef] = useState(null);
//   const [type, setType] = useState(CameraType.back); // use front camera

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   if (hasPermission === null) {
//     return <Text>Requesting for camera permission</Text>;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <Camera
//         style={{ flex: 1 }}
//         type={type}
//         ref={ref => setCameraRef(ref)}
//       />
//     </View>
//   );
// }
