import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ToastAndroid, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = () => {
    const navigation = useNavigation();
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const isFormValid = number.trim() !== '' && password.trim() !== '';


    const handleSignIn = async () => {
        if (!isFormValid) {
            ToastAndroid.show('Please fill all fields.', ToastAndroid.SHORT);
            return;
        }

        try {
            const response = await fetch('https://tor.appdevelopers.mobi/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: number,
                    password: password,
                }),
            });
            const result = await response.json();
            if (result.status) {
                // Save the user token to AsyncStorage
                await AsyncStorage.setItem('userData', JSON.stringify(result.data));
                ToastAndroid.show('Sign In successful! Welcome back!', ToastAndroid.LONG);
                setNumber('');
                setPassword('');
                navigation.navigate('Home');    
                navigation.reset();
                
            } else {
                console.log('API Response:', result);
                if (result.message) {
                    ToastAndroid.show(result.message, ToastAndroid.LONG);
                } else {
                    ToastAndroid.show('Sign In failed. Please try again.', ToastAndroid.SHORT);
                }
            }
        } catch (error) {
            console.error('Error during Sign In:', error);
        }
    };


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../assets/images/logo.png')} // Change this path as needed
                        style={styles.logo}
                        resizeMode="cover"
                    />
                </View>
                <View>
                    <Text style={styles.title}>Sign In</Text>
                    <Text style={styles.subtitle}>{`Hi ! Welcome back, you\nhave been missed`}</Text>
                    <Text style={styles.label}>Phone</Text>
                    <View style={styles.inputContainer}>
                        <Icon2 name="phone-call" size={20} color="gray" />
                        <TextInput
                            placeholder="mobile number"
                            placeholderTextColor={'#808080'}
                            value={number}
                            onChangeText={setNumber}
                            style={styles.input}
                            keyboardType="number-pad"
                        />
                    </View>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.inputContainer}>
                        <Icon2 name="lock" size={20} color="gray" />
                        <TextInput
                            placeholder="password"
                            placeholderTextColor={'#808080'}
                            value={password}
                            onChangeText={setPassword}
                            style={styles.input}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity onPress={() => console.log('Forgot Password')} style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleSignIn}
                        style={[styles.signInButton, { opacity: isFormValid ? 1 : 0.5 }]}
                        disabled={!isFormValid}
                    >
                        <Text style={styles.signInButtonText}>Sign In</Text>
                    </TouchableOpacity>

                    <View style={styles.dividerContainer}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>or</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    <View style={styles.socialLoginContainer}>
                        <TouchableOpacity style={styles.socialLoginButton}>
                            <Icon name="google" size={24} color="#000" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialLoginButton}>
                            <Icon name="apple" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.signUpContainer}>
                    <View style={styles.signUpTextContainer}>
                        <Text style={styles.signUpText}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={styles.signUpLink}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.termsText}>
                        By login or sign up, you agree to our terms of use and privacy policy.
                    </Text>
                </View>
                 <View style={{ position: 'absolute', bottom: 0 ,left:0, zIndex:-1}}>
                    <Image source={require('../assets/images/Maskgroup2.png')} style={{height:150}} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 25,
    },
    logoContainer: {
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 150,
    },
    title: {
        fontSize: 24,
        marginBottom: 0,
        fontFamily: 'Poppins-Bold',
        color: 'black'
    },
    subtitle: {
        color: '#6B7280',
        fontFamily: 'Poppins-Regular',
    },
    label: {
        color: 'black',
        fontFamily: 'Poppins-Regular',
        paddingVertical: 4,
        paddingHorizontal: 5
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#D1D5DB',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
    },
    input: {
        marginLeft: 8,
        flex: 1,
        color: '#374151',
        fontFamily: 'Inter_18pt-Italic'
    },
    forgotPassword: {
        marginVertical: 7,
        marginBottom: 20
    },
    forgotPasswordText: {
        color: '#000',
        textAlign: 'right',
        fontFamily: 'Poppins-Regular',
        textDecorationLine: 'underline',
    },
    signInButton: {
        backgroundColor: '#A3CFFF',
        paddingVertical: 16,
        borderRadius: 40,
        shadowColor: '#A3CFFF',
        elevation: 20
    },
    signInButtonText: {
        color: '#092A4D',
        height: 25,
        textAlign: 'center',
        fontFamily: 'Inter_24pt-Bold',
        fontSize: 22,
        textAlignVertical: 'center',
        lineHeight: 25
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    dividerLine: {
        height: 1,
        width: '35%',
        backgroundColor: '#A3CFFF',
    },
    dividerText: {
        color: '#9CA3AF',
        marginHorizontal: 8,
    },
    socialLoginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    socialLoginButton: {
        borderWidth: 1,
        borderColor: '#A3CFFF',
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        width: 45,
        borderRadius: 50,
        marginHorizontal: 8,
    },
    signUpContainer: {
        alignItems: 'center',
        marginTop: 16,
    },
    signUpTextContainer: {
        flexDirection: 'row',
    },
    signUpText: {
        color: '#6B7280',
        fontFamily: 'Inter_18pt-Regular'
    },
    signUpLink: {
        color: '#000',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        marginLeft: 4,
    },
    termsText: {
        color: '#808080',
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        marginVertical: 15
    },
});

export default SignInScreen;
