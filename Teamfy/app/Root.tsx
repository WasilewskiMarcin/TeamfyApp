import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import ClerkAndConvexProvider from '@/providers/ClerkAndConvexProvider'
import SafeUserProvider from '@/providers/SafeUserProvider'
import { useAuth } from '@clerk/clerk-expo'
import LoginScreen from './(auth)/LoginScreen'
import UpcomingScreen from './(tabs)/UpcomingScreen'
import SettingsScreen from './(tabs)/Settings/SettingsScreen'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProjectManagerScreen from './(tabs)/ProjectManagerScreen'
import {Ionicons} from '@expo/vector-icons'
import CalendarIconWithDate from '@/components/CalendarIconWithDate'

const Tab = createBottomTabNavigator()
export default function RootLayout() {
	return (
		<ClerkAndConvexProvider>
			<SafeAreaProvider>
				<SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
					<SafeUserProvider>
						<RootNavigation />
						{/* <Stack screenOptions={{ headerShown: false }} /> */}
					</SafeUserProvider>
				</SafeAreaView>
			</SafeAreaProvider>
		</ClerkAndConvexProvider>
	)
}
type RootStackParamList = {
	Main: undefined
	Settings: undefined
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>
function RootNavigation() {
	const { isSignedIn } = useAuth()
	const navigation = useNavigation<NavigationProp>()
	if (isSignedIn) {
		return (
			<View style={{ flex: 1 }}>
				<Tab.Navigator screenOptions={{ headerShown: false }}>
					<Tab.Screen  name='UpcomingScreen' component={UpcomingScreen} options={{
						tabBarIcon: ({size, color}) => <CalendarIconWithDate size={size} color={color} />,
						}}/>
					<Tab.Screen name='ProjectManagerScreen' component={ProjectManagerScreen} options={{
						tabBarIcon: ({ size, color }) => (
							<Ionicons name="home" size={size} color={color} />
						  ),
						}}/>

					<Tab.Screen name='Settings' component={SettingsScreen} options={{
						tabBarIcon: ({ size, color }) => (
							<Ionicons name="settings" size={size} color={color} />
						  ),
						}}/>
				</Tab.Navigator>
			</View>
		)
	} else {
		return <LoginScreen />
	}
}
