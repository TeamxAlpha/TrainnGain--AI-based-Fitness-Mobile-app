import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PerformanceAnalytics = () => {
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        // ✅ Get stored userId from AsyncStorage
        const storedUserId = await AsyncStorage.getItem("userId");

        if (!storedUserId) {
          console.warn("⚠️ No userId found in storage");
          return;
        }

        // ✅ Fetch performance data
        const response = await axios.get(
          `http://192.168.100.114:5001/performance-analytics/${storedUserId}`
        );

        if (response.data.success) {
          setPerformanceData(response.data.monthlyProgress);
        } else {
          console.warn("⚠️ No progress data available");
        }
      } catch (error) {
        console.error(
          '❌ Error fetching performance data:',
          error.response?.data || error.message
        );
      }
    };

    fetchPerformanceData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📈 Performance Analytics</Text>

      {performanceData.length > 0 ? (
        <LineChart
          data={{
            labels: performanceData.map((entry) => entry.date),
            datasets: [
              {
                data: performanceData.map((entry) => entry.value),
              },
            ],
          }}
          width={Dimensions.get('window').width - 20}
          height={220}
          chartConfig={{
            backgroundColor: '#3F51B5',
            backgroundGradientFrom: '#5C6BC0',
            backgroundGradientTo: '#7986CB',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      ) : (
        <Text style={{ textAlign: "center", marginTop: 20, color: "#555" }}>
          No performance data available.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: "center",
    color: "#3F51B5"
  },
});

export default PerformanceAnalytics;
