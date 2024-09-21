import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
const Stack = createStackNavigator();

const AppNavigation = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 2000)
        const checkLoginStatus = async () => {
            try {
                const userData = await AsyncStorage.getItem('userData');
                if (userData) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Error checking login status:', error);
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();
    }, []);

    if (isLoggedIn === null) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={isLoggedIn ? 'Home' : 'Welcome'}
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;
