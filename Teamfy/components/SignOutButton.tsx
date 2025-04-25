import { useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { View } from 'react-native'
import { COLORS } from '@/constants/theme'

export const SignOutButton = () => {
	// Use `useClerk()` to access the `signOut()` function
	const { signOut } = useClerk()

	const handleSignOut = async () => {
		try {
			await signOut()
			// Redirect to your desired page
			Linking.openURL(Linking.createURL('/login'))
		} catch (err) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			console.error(JSON.stringify(err, null, 2))
		}
	}

	return (
		<TouchableOpacity onPress={handleSignOut}>
			<MaterialIcons name='logout' size={24} color={COLORS.primary} />
		</TouchableOpacity>
	)
}
