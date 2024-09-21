import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute', alignSelf: 'flex-start', top: 0, left: 5 }}>
        <Image source={require('../assets/images/logo1.png')} />
      </View>
      <View style={{ position: 'absolute', alignSelf: 'flex-start', top: -10, right:-10 }}>
        <Image source={require('../assets/images/Maskgroup.png')} resizeMode='contain' />
      </View>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.tagline}>
        {`Sparkle & Shine, Transform\nYour Drive with Every Wash!`}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.buttonText}>Let’s Start</Text>
      </TouchableOpacity>

      <View style={styles.signInTextContainer}>
        <Text style={styles.signInText}>Already  have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.signInLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 25,
  },
  logo: {
    width: 280,
    height: 230,
    marginVertical:60
  },
  tagline: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    color: '#808080',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#A3CFFF',
    paddingVertical: 16,
    borderRadius: 40,
    width: '100%',
    shadowColor: '#A3CFFF',
    elevation: 20
  },
  buttonText: {
    color: '#092A4D',
    height: 25,
    textAlign: 'center',
    fontFamily: 'Inter_24pt-Bold',
    fontSize: 22,
    textAlignVertical: 'center',
    lineHeight: 25
  },
  signInTextContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signInText: {
    color: '#6B7280',
    fontFamily: 'Inter_18pt-Regular'
  },
  signInLink: {
    color: '#000',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    marginLeft: 4,
  },
});

export default WelcomeScreen;
