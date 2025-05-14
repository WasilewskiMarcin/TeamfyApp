import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { styles } from '@/styles/auth.styles'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { COLORS } from '@/constants/theme'
import { useSSO, useSignIn, useSignUp, useUser } from '@clerk/clerk-expo'
import ForgotPasswordScreen from './ForgotPassowrdScreen'

export default function LoginScreen() {
	const { startSSOFlow } = useSSO()

	const { signIn, setActive: setActiveSignIn, isLoaded: signInLoaded } = useSignIn()
	const { signUp, setActive: setActiveSignUp, isLoaded: signUpLoaded } = useSignUp()

	const [emailMode, setEmailMode] = useState<'login' | 'signup'>('login')
	const [pendingVerify, setPendingVerify] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [code, setCode] = useState('')
	const [view, setView] = useState<'login' | 'forgot'>('login')

	const handleEmailLogin = async () => {
		if (!signInLoaded) return
		try {
			const resultLogin = await signIn.create({
				identifier: email,
				password,
			})
			if (resultLogin.status === 'complete') {
				await setActiveSignIn({ session: resultLogin.createdSessionId })
			} else {
				console.log('Login error:', resultLogin)
			}
		} catch (error) {
			if (error instanceof Error) {
				Alert.alert('Login Failed', error.message || 'An unknown error occurred.')
			} else {
				Alert.alert('Login Failed', 'Invalid credentials')
			}
		}
	}

	const handleEmailSignUp = async () => {
		if (!signUpLoaded) return
		try {
			await signUp.create({
				emailAddress: email,
				password: password,
			})
			await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
			setPendingVerify(true)
		} catch (error) {
			if (error instanceof Error) {
				Alert.alert('Sign Up Failed', error.message || 'An unknown error occurred.')
			} else {
				Alert.alert('Sign Up Failed', 'Invalid credentials')
			}
		}
	}

	const handleVerifyCode = async () => {
		if (!signUpLoaded) return
		try {
			const verifyResult = await signUp.attemptEmailAddressVerification({ code })
			if (verifyResult.status === 'complete') {
				await setActiveSignUp({ session: verifyResult.createdSessionId })
			} else {
				Alert.alert('Verification failed', 'The verification code is incorrect or expired.')
			}
		} catch (error) {
			if (error instanceof Error) {
				Alert.alert('Verification failed', error.message || 'An error occurred during verification.')
			} else {
				Alert.alert('Verification failed', 'Invalid code')
			}
		}
	}

	const handleGoogleSignIn = async () => {
		try {
			const { createdSessionId, setActive } = await startSSOFlow({ strategy: 'oauth_google' })
			if (setActive && createdSessionId) {
				await setActive({ session: createdSessionId })
			}
		} catch (error) {
			console.error('0Auth error:', error)
			Alert.alert('Login Error', 'Something went wrong. Please try again.')
		}
	}

	// 👇 Warunkowe renderowanie ekranu "Zapomniałeś hasła"
	if (view === 'forgot') {
		return <ForgotPasswordScreen goBack={() => setView('login')} />
	}

	return (
		<View style={styles.container}>
			{/* Branding */}
			<View style={styles.brandSection}>
				<View style={styles.logoContainer}>
					<AntDesign name='dingding' size={32} color={COLORS.primary} />
				</View>
				<Text style={styles.appName}>Teamfy</Text>
				<Text style={styles.tagline}>Find mate!</Text>
			</View>

			<View style={styles.loginSection}>
				{/* Email Login Section */}
				<TouchableOpacity onPress={() => setEmailMode(emailMode === 'login' ? 'signup' : 'login')}>
					<Text style={styles.signUpInfoText}>
						{emailMode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
					</Text>
				</TouchableOpacity>

				<TextInput
					placeholder='Email'
					value={email}
					onChangeText={setEmail}
					autoCapitalize='none'
					keyboardType='email-address'
					style={styles.input}
				/>
				<TextInput
					placeholder='Password'
					value={password}
					onChangeText={setPassword}
					secureTextEntry
					style={styles.input}
				/>

				{/* Link do "zapomniałem hasła" */}
				<TouchableOpacity onPress={() => setView('forgot')}>
					<Text style={{ textAlign: 'center', color: COLORS.primary, marginTop: 10, marginBottom: 10 }}>
						Forgot Password?
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={{ ...styles.googleButtonContainer, ...styles.googleButton }}
					onPress={emailMode === 'login' ? handleEmailLogin : handleEmailSignUp}
					activeOpacity={0.9}>
					<Text style={styles.googleButtonText}>
						{emailMode === 'login' ? 'Log in with Email' : 'Sign up with Email'}
					</Text>
				</TouchableOpacity>

				{pendingVerify && (
					<View style={styles.verifySection}>
						<Text style={{ fontWeight: 'bold', textAlign: 'center', color: 'green', marginBottom: 5 }}>
							Verify your email
						</Text>
						<TextInput
							placeholder='Verification code'
							value={code}
							onChangeText={setCode}
							keyboardType='numeric'
							style={styles.verifyInput}
						/>
						<TouchableOpacity
							onPress={handleVerifyCode}
							style={[styles.googleButtonContainer, styles.verifyButton]}
							activeOpacity={0.9}>
							<Text style={styles.googleButtonText}>Verify</Text>
						</TouchableOpacity>
					</View>
				)}

				<TouchableOpacity
					style={{ ...styles.googleButtonContainer, ...styles.googleButton }}
					onPress={handleGoogleSignIn}
					activeOpacity={0.9}>
					<View style={styles.googleIconContainer}>
						<Ionicons name='logo-google' size={20} color={COLORS.surface} />
					</View>
					<Text style={styles.googleButtonText}>Continue with Google</Text>
				</TouchableOpacity>
			</View>

			<Text style={styles.termsText}>By continuing, you agree to our Terms and Privacy Policy</Text>
		</View>
	)
}
