import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';

const PerformanceAnalytics = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [userId, setUserId] = useState(''); 

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const response = await axios.get(`http://192.168.137.1:5001/performance-analytics/${userId}`); //Zohaib's 192.168.137.1, Mahdi's 192.168.100.8
        setPerformanceData(response.data.monthlyProgress);
      } catch (error) {
        console.error('Error fetching performance data:', error);
      }
    };

    fetchPerformanceData();
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Performance Analytics</Text>
      <LineChart
        data={{
          labels: performanceData.map((entry) => entry.date),
          datasets: [
            {
              data: performanceData.map((entry) => entry.value),
            },
          ],
        }}
        width={Dimensions.get('window').width}
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
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
  },
});

export default PerformanceAnalytics;
