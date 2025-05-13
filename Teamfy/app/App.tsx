import { SafeAreaProvider } from 'react-native-safe-area-context'
import ClerkAndConvexProvider from '@/providers/ClerkAndConvexProvider'
import SafeUserProvider from '@/providers/SafeUserProvider'
import { useAuth } from '@clerk/clerk-expo'
import LoginScreen from './(auth)/LoginScreen'
import UpcomingScreen from './(tabs)/UpcomingScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProjectManagerScreen from './(tabs)/ProjectManagerScreen'
import { Ionicons } from '@expo/vector-icons'
import CalendarIconWithDate from '@/components/CalendarIconWithDate'
import CreateEventScreen from './(tabs)/CreateEventScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from './ProfileScreen'
import SettingsScreen from './(tabs)/Settings/SettingsScreen'
import { NavigationContainer } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<ClerkAndConvexProvider>
			<SafeAreaProvider>
				<SafeUserProvider>
					<NavigationContainer>
						<MainNavigator />
					</NavigationContainer>
				</SafeUserProvider>
			</SafeAreaProvider>
		</ClerkAndConvexProvider>
	)
}

function MainNavigator() {
	const { isSignedIn } = useAuth()

	if (isSignedIn) {
		return (
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name='Tabs' component={RootTabNavigation} />
				<Stack.Screen name='Profile' component={ProfileScreen} />
			</Stack.Navigator>
		)
	} else {
		return <LoginScreen />
	}
}
function RootTabNavigation() {
	const { user, isLoaded } = useUser()
	const [didSetUsername, setDidSetUsername] = useState(false)
	useEffect(() => {
		if(didSetUsername) return
		if (isLoaded && user && !didSetUsername) {
			const fallbackUsername = user.primaryEmailAddress?.emailAddress.split('@')[0] ?? ''
			user
				.update({ username: user.username || fallbackUsername })
				.then(() => {
					console.log('Username ustawiony:', user.username)
					setDidSetUsername(true)
				})
				.catch(e => console.error('Błąd ustawiania username:', e))
		}
	}, [isLoaded, user, didSetUsername])
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
			<Tab.Screen
				name='Upcoming'
				component={UpcomingScreen}
				options={{
					tabBarIcon: ({ size, color }) => <CalendarIconWithDate size={size} color={color} />,
				}}
			/>
			<Tab.Screen
				name='ProjectManager'
				component={ProjectManagerScreen}
				options={{
					tabBarIcon: ({ size, color }) => <Ionicons name='home' size={size} color={color} />,
				}}
			/>
			<Tab.Screen
				name='CreateEvent'
				component={CreateEventScreen}
				options={{
					tabBarIcon: ({ size, color }) => <Ionicons name='add-circle' size={size} color={color} />,
				}}
			/>
			<Tab.Screen
				name='SettingsNavigator'
				component={SettingsNavigator}
				options={{
					tabBarIcon: ({ size, color }) => <Ionicons name='settings' size={size} color={color} />,
				}}
			/>
		</Tab.Navigator>
	)
}
function SettingsNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name='Settings' component={SettingsScreen} />
		</Stack.Navigator>
	)
}
