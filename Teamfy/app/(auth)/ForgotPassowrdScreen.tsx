import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useSignIn } from '@clerk/clerk-expo'
import { styles } from '@/styles/auth.styles'
import { COLORS } from '@/constants/theme'
import TopTabNavigator from '@/components/TopBarComponents/TopTabNavigator'
import { Ionicons } from '@expo/vector-icons'
type Props = {
	goBack: () => void
}

export default function ForgotPasswordScreen({ goBack }: Props) {
	const { signIn, setActive, isLoaded } = useSignIn()

	const [email, setEmail] = useState('')
	const [code, setCode] = useState('')
	const [password, setPassword] = useState('')
	const [step, setStep] = useState<'email' | 'reset'>('email')

	const handleSendResetCode = async () => {
		if (!isLoaded) return

		try {
			await signIn.create({
				strategy: 'reset_password_email_code',
				identifier: email,
			})
			setStep('reset')
			Alert.alert('Success', 'Reset code sent to your email.')
		} catch (err: any) {
			const msg = err?.errors?.[0]?.longMessage || 'Failed to send reset code.'
			Alert.alert('Error', msg)
		}
	}

	const handleResetPassword = async () => {
		if (!isLoaded) return

		try {
			const result = await signIn.attemptFirstFactor({
				strategy: 'reset_password_email_code',
				code,
				password,
			})

			if (result.status === 'complete') {
				await setActive({ session: result.createdSessionId })
				Alert.alert('Success', 'Password reset successfully!')
			} else {
				Alert.alert('Error', 'Something went wrong. Please try again.')
			}
		} catch (err: any) {
			const msg = err?.errors?.[0]?.longMessage || 'Failed to reset password.'
			Alert.alert('Error', msg)
		}
	}

	return (
		<TopTabNavigator
			leftbutton={
				<TouchableOpacity onPress={goBack} style={{ flexDirection: 'row', alignItems: 'center', left: -10 }}>
					<Ionicons name='chevron-back' size={26} color={COLORS.primary} />
					<Text style={{ fontSize: 16 }}>Back</Text>
				</TouchableOpacity>
			}
			text=''>
			<View style={{...styles.loginSection, marginTop: -15}}>
        <Text style={{fontSize: 32, fontWeight:'bold', marginBottom:20}}>Reset Password</Text>
				{step === 'email' ? (
					<>
						<TextInput placeholder='Enter your email' value={email} onChangeText={setEmail} style={styles.input} />
						<TouchableOpacity
							onPress={handleSendResetCode}
							style={{ ...styles.googleButtonContainer, ...styles.googleButton, marginTop: 5 }}
							activeOpacity={0.9}>
							<Text style={styles.googleButtonText}>Send Reset Code</Text>
						</TouchableOpacity>
					</>
				) : (
					<>
						<TextInput placeholder='Enter reset code' value={code} onChangeText={setCode} style={styles.input} />
						<TextInput
							placeholder='New password'
							value={password}
							onChangeText={setPassword}
							secureTextEntry
							style={styles.input}
						/>
						<TouchableOpacity
							onPress={handleResetPassword}
							style={{ ...styles.googleButtonContainer, ...styles.googleButton }}
							activeOpacity={0.9}>
							<Text style={styles.googleButtonText}>Reset Password</Text>
						</TouchableOpacity>
					</>
				)}
			</View>
		</TopTabNavigator>
	)
}
