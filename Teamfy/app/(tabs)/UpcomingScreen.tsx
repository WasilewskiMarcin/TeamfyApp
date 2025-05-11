import { View, Text } from 'react-native'
import TopTabNavigator from '@/components/TopBarComponents/TopTabNavigator'
import { SignOutButton } from '@/components/SignOutButton'
import ProfileButton from '@/components/ProfileButton'
export default function UpcomingScreen() {
	return (
		<TopTabNavigator leftbutton={<ProfileButton />} text='Teamfy' rightbutton={<SignOutButton />}>
			<View>
				<Text>Upcoming</Text>
			</View>
		</TopTabNavigator>
	)
}
