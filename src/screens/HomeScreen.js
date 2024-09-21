import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  // const { userName } = route.params || { userName: 'Ramesh' };
  const [userName, setUserName] = useState({ userName: 'Ramesh' })
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      navigation.navigate('SignIn');
      navigation.reset();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  const getUser = async () => {
    const res = await (AsyncStorage.getItem('userData')) || { userName: 'Ramesh' }
    const parser = JSON.parse(res)
    const data = {
      userName: parser.name
    }
    setUserName(data)
  }
  useEffect(() => {
    getUser();
  }, [])

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="cover"
      />

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome {userName?.userName || 'Ramesh'}</Text>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 25,
  },
  logo: {
    width: 200,
    height: 150,
    // top:-100
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: 'Inter_24pt-Bold',
    // marginVertical: 40,
    color: 'black'
  },
  logoutButton: {
    backgroundColor: '#A3CFFF',
    paddingVertical: 16,
    borderRadius: 40,
    shadowColor: '#A3CFFF',
    elevation: 20,
    width: '100%'
  },
  logoutButtonText: {
    color: '#092A4D',
    height: 25,
    textAlign: 'center',
    fontFamily: 'Inter_24pt-Bold',
    fontSize: 22,
    textAlignVertical: 'center',
    lineHeight: 25
  },
});

export default HomeScreen;
