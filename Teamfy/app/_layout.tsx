import { Stack } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import ClerkAndConvexProvider from '@/providers/ClerkAndConvexProvider'
import SafeUserProvider from '@/providers/SafeUserProvider'
export default function RootLayout() {
	return (
		<ClerkAndConvexProvider>
			<SafeAreaProvider>
				<SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
					<SafeUserProvider>
						<Stack screenOptions={{ headerShown: false }} />
					</SafeUserProvider>
				</SafeAreaView>
			</SafeAreaProvider>
		</ClerkAndConvexProvider>
	)
}
