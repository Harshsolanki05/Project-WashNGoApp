import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ToastAndroid, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const isFormValid = name.trim() !== '' && number.trim() !== '' && password.trim() !== '' && agreeTerms;

    const handleSignUp = async () => {
        try {
            const response = await fetch('https://tor.appdevelopers.mobi/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: number,
                    password: password,
                    name: name,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                await AsyncStorage.setItem('userData', JSON.stringify(result.data));
                ToastAndroid.show('Sign Up successful! Welcome!', ToastAndroid.LONG);
                setName('')
                setNumber('')
                setPassword('')
                setAgreeTerms(false)
                navigation.navigate('Home')
                navigation.reset()
            } else {
                if (result.error) {
                    const errorMessages = Object.values(result.error)
                        .flat()
                        .join(' ');
                    ToastAndroid.show(errorMessages, ToastAndroid.LONG);
                } else {
                    ToastAndroid.show('Sign Up failed. Please try again.', ToastAndroid.SHORT);
                }
            }
        } catch (error) {
            console.error('Error during Sign Up:', error);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps='handled'
            >
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../assets/images/logo.png')}
                        style={styles.logo}
                        resizeMode="cover"
                    />
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.headerText}>Sign Up</Text>
                    <Text style={styles.subHeaderText}>
                        {`Fill in the below form and add life to\nyour car!`}
                    </Text>

                    <Text style={styles.label}>Name</Text>
                    <View style={styles.inputContainer}>
                        <Icon name="user" size={20} color="gray" />
                        <TextInput
                            placeholder="Enter your name"
                            placeholderTextColor={'#808080'}
                            value={name}
                            onChangeText={setName}
                            style={styles.input}
                        />
                    </View>

                    <Text style={styles.label}>Phone</Text>
                    <View style={styles.inputContainer}>
                        <Icon name="phone-call" size={20} color="gray" />
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
                        <Icon name="lock" size={20} color="gray" />
                        <TextInput
                            placeholder="password"
                            placeholderTextColor={'#808080'}
                            value={password}
                            onChangeText={setPassword}
                            style={styles.input}
                            secureTextEntry
                        />
                    </View>

                    <View style={styles.termsContainer}>
                        <CheckBox tintColors={{ true: 'skyblue', false: 'gray' }} value={agreeTerms} onValueChange={setAgreeTerms} />
                        <Text style={styles.termsText}>Agree with</Text>
                        <TouchableOpacity>
                            <Text style={styles.termsLink}>Terms & Conditions</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={handleSignUp}
                        style={[styles.signUpButton, { opacity: isFormValid ? 1 : 0.5 }]}
                        disabled={!isFormValid}
                    >
                        <Text style={styles.signUpButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomContainer}>
                    <View style={styles.row}>
                        <Text style={styles.alreadyText}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                            <Text style={styles.signInLink}>Sign In</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.termsInfo}>
                        {`By login or sign up, you agree to our terms of use\nand privacy policy.`}
                    </Text>
                </View>
                <View style={{ position: 'absolute', bottom: 0, right: 0, zIndex: -1 }}>
                    <Image source={require('../assets/images/Maskgroup(1).png')}  />
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
    scrollContainer: {
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
    formContainer: {
        flex: 1,
    },
    headerText: {
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
        color: '#000',
        marginBottom: 8,
    },
    subHeaderText: {
        color: 'gray',
        fontFamily: 'Inter_18pt-Regular',
        marginBottom: 10,
    },
    label: {
        color: 'black',
        fontFamily: 'Poppins-Regular',
        paddingVertical: 4,
        paddingHorizontal: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 10,
        paddingHorizontal: 12,
    },
    input: {
        marginLeft: 8,
        flex: 1,
        fontFamily: 'Inter_18pt-Italic',
        color: 'black',
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    termsText: {
        marginLeft: 8,
        color: '#000',
        fontFamily: 'Poppins-Regular',
    },
    termsLink: {
        color: '#797979',
        marginLeft: 4,
        textDecorationLine: 'underline',
        fontFamily: 'Poppins-Regular',
    },
    signUpButton: {
        backgroundColor: '#A3CFFF',
        paddingVertical: 16,
        borderRadius: 40,
        shadowColor: '#A3CFFF',
        elevation: 20
    },
    signUpButtonText: {
        color: '#092A4D',
        height: 25,
        textAlign: 'center',
        fontFamily: 'Inter_24pt-Bold',
        fontSize: 22,
        textAlignVertical: 'center',
        lineHeight: 25
    },
    bottomContainer: {
        alignItems: 'center',
        marginTop: 16,
    },
    row: {
        flexDirection: 'row',
    },
    alreadyText: {
        color: '#6B7280',
        fontFamily: 'Inter_18pt-Regular'
    },
    signInLink: {
        color: '#000',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        marginLeft: 4,
    },
    termsInfo: {
        color: '#808080',
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        marginVertical: 15
    },
});

export default SignUpScreen;
