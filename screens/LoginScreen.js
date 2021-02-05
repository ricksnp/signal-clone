import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { auth } from '../firebase';

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// Only run it on the component mounting
	useEffect(() => {
		//Essentially a real-time listener that is based on the status
		//of a logged in or unlogged in user.  AKA, router guard if
		// you're using react-router
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				navigation.replace('Home');
			}
		});

		// Will allow us to unsubscribe if the component re-mounts
		return unsubscribe;
	}, []);

	const signIn = () => {
		auth
			.signInWithEmailAndPassword(email, password)
			.catch((error) => alert(error));
	};
	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<StatusBar style="light" />
			<Image
				source={{
					uri:
						'https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png',
				}}
				style={{ width: 200, height: 200 }}
			/>
			<View style={styles.inputContainer}>
				<Input
					placeholder="Email"
					autoFocus
					type="email"
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
				<Input
					placeholder="Password"
					onSubmitEditing={signIn}
					secureTextEntry
					type="password"
					value={password}
					onChangeText={(text) => setPassword(text)}
				/>
			</View>
			<Button
				containerStyle={styles.button}
				onPress={signIn}
				title="Login"
			/>
			<Button
				containerStyle={styles.button}
				onPress={() => navigation.navigate('Register')}
				type="outline"
				title="Register"
			/>
			{/* This view adds extra space so that when we go to type, the view is pushed up more */}
			<View style={{ height: 100 }} />
		</KeyboardAvoidingView>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	inputContainer: {
		width: 300,
	},
	button: {
		width: 200,
		marginTop: 10,
	},
	container: {
		// Use the entire height
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		backgroundColor: 'white',
	},
});
