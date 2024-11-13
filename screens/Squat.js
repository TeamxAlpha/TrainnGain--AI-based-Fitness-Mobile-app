import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/pose-detection';

const SquatCheck = () => {
    const [hasPermission, requestPermission] = useCameraPermissions(); // Destructure correctly
    const [cameraRef, setCameraRef] = useState(null);
    const [isPoseCorrect, setIsPoseCorrect] = useState(null);
    const [model, setModel] = useState(null);
    const [facing, setFacing] = useState < CameraType > ('back');

    useEffect(() => {
        const loadModel = async () => {
            await tf.ready();
            const loadedModel = await posenet.load();
            setModel(loadedModel);
        };
        loadModel();

        if (!hasPermission) {
            // Camera permissions are still loading.
            return <View />;
        }

        if (!hasPermission.granted) {
            // Camera permissions are not granted yet.
            return (
                <View style={styles.container}>
                    <Text style={styles.message}>We need your permission to show the camera</Text>
                    <Button onPress={requestPermission} title="grant permission" />
                </View>
            );
        }
    }, []);

    const calculateAngle = (a, b, c) => {
        const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
        const angle = Math.abs(radians * (180 / Math.PI));
        return angle > 180 ? 360 - angle : angle;
    };

    const checkSquat = (landmarks) => {
        const hip = landmarks[11];
        const knee = landmarks[13];
        const ankle = landmarks[15];

        const angle = calculateAngle(hip, knee, ankle);

        if (angle >= 80 && angle <= 120) {
            setIsPoseCorrect(true);
            Alert.alert('Good job!', 'Your squat form is correct.');
        } else {
            setIsPoseCorrect(false);
            Alert.alert('Try again', 'Adjust your squat position.');
        }
    };

    const startPoseDetection = async () => {
        if (cameraRef && model) {
            const frame = await cameraRef.takePictureAsync();
            const image = await tf.browser.fromPixels(frame);
            const pose = await model.estimateSinglePose(image);
            const landmarks = pose.keypoints;

            if (pose && landmarks.length > 0) {
                checkSquat(landmarks);
            }
        }
    };

    const toggleCamera = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    if (hasPermission === null) {
        return <Text>Requesting camera permission...</Text>;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
            {/* <Text style={styles.title}>Squat Form Check</Text>
            {hasPermission && (
                <CameraView
                    style={styles.camera}
                    facing={facing}
                    ref={(ref) => setCameraRef(ref)}
                >
                    <View style={styles.overlay}>
                        <TouchableOpacity style={styles.checkButton} onPress={startPoseDetection}>
                            <Text style={styles.checkButtonText}>Check Squat Form</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.toggleButton} onPress={toggleCamera}>
                            <Text style={styles.toggleButtonText}>Toggle Camera</Text>
                        </TouchableOpacity>
                    </View>
                </CameraView>
            )}
            {isPoseCorrect !== null && (
                <Text style={styles.result}>
                    {isPoseCorrect ? 'Form is Correct!' : 'Form is Incorrect!'}
                </Text>
            )} */}
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
        flex: 1,
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

export default SquatCheck;