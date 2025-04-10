import { Stack } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
if (!publishableKey) {
	throw new Error('Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in .env')
}

export default function RootLayout() {
	return (
		<ClerkProvider publishableKey={publishableKey}>
			<ClerkLoaded>
				<SafeAreaProvider>
					<SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
						<Stack
							screenOptions={{
								headerShown: false,
								contentStyle: {
									backgroundColor: '#000000',
								},
							}}></Stack>
					</SafeAreaView>
				</SafeAreaProvider>
			</ClerkLoaded>
		</ClerkProvider>
	)
}
