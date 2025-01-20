import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, LayoutAnimation } from 'react-native';
import { WebView } from 'react-native-webview';

const ChatBot = () => {
  const [windowDimensions, setWindowDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const updateDimensions = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Add animation for smoother transitions
      setWindowDimensions(Dimensions.get('window'));
    };

    Dimensions.addEventListener('change', updateDimensions); 

    return () => {
      // No need to remove the listener explicitly
    }; 
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://www.chatbase.co/chatbot-iframe/vtE4KYgApu7v3fbuBs-No' }}
        style={{ width: '100%', height: windowDimensions.height - 90 }} 
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%', 
  },
});

export default ChatBot;