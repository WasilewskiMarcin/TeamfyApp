import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import ClerkAndConvexProvider from '@/providers/ClerkAndConvexProvider'
import SafeUserProvider from '@/providers/SafeUserProvider'
import { useAuth } from '@clerk/clerk-expo'
import LoginScreen from './(auth)/LoginScreen'
import UpcomingScreen from './(tabs)/UpcomingScreen'
import SettingsScreen from './(tabs)/Settings/SettingsScreen'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProjectManagerScreen from './(tabs)/ProjectManagerScreen'
import { Ionicons } from '@expo/vector-icons'
import CalendarIconWithDate from '@/components/CalendarIconWithDate'
import TopNavigator from '@/components/TopNavigator'
import CreateEventScreen from './(tabs)/CreateEventScreen'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from './ProfileScreen'

export type RootStackParamList = {
	Tabs: undefined
	Profile: undefined
	Login: undefined
}

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator()

export default function RootLayout() {
	return (
		<ClerkAndConvexProvider>
			<SafeAreaProvider>
				<SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
					<SafeUserProvider>
						<MainNavigator />
					</SafeUserProvider>
				</SafeAreaView>
			</SafeAreaProvider>
		</ClerkAndConvexProvider>
	)
}
function MainNavigator() {
	const { isSignedIn } = useAuth()

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{isSignedIn ? (
				<>
					<Stack.Screen name='Tabs' component={RootTabNavigation} />
					<Stack.Screen name='Profile' component={ProfileScreen} />
				</>
			) : (
				<Stack.Screen name='Login' component={LoginScreen} />
			)}
		</Stack.Navigator>
	)
}

function RootTabNavigation() {
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
			<Tab.Screen
				name='Upcoming'
				children={() => (
					<TopNavigator>
						<UpcomingScreen />
					</TopNavigator>
				)}
				options={{
					tabBarIcon: ({ size, color }) => <CalendarIconWithDate size={size} color={color} />,
				}}
			/>
			<Tab.Screen
				name='ProjectManager'
				children={() => (
					<TopNavigator>
						<ProjectManagerScreen />
					</TopNavigator>
				)}
				options={{
					tabBarIcon: ({ size, color }) => <Ionicons name='home' size={size} color={color} />,
				}}
			/>
			<Tab.Screen
				name='CreateEvent'
				children={() => (
					<TopNavigator>
						<CreateEventScreen />
					</TopNavigator>
				)}
				options={{
					tabBarIcon: ({ size, color }) => <Ionicons name='add-circle' size={size} color={color} />,
				}}
			/>
			<Tab.Screen
				name='Settings'
				component={SettingsScreen}
				options={{
					tabBarIcon: ({ size, color }) => <Ionicons name='settings' size={size} color={color} />,
				}}
			/>
		</Tab.Navigator>
	)
}
