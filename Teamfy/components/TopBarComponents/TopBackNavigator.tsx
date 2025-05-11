import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import TopTabNavigator from './TopTabNavigator'
import Ionicons from '@expo/vector-icons/Ionicons'
import { SignOutButton } from '@/components/SignOutButton'

export default function TopBackNavigator({ children }: { children: React.ReactNode }) {
	const navigation = useNavigation()
	return (
		<TopTabNavigator
			leftbutton={
				<TouchableOpacity onPress={() => navigation.goBack()}
				style={{ flexDirection: 'row', alignItems: 'center'}}>
					<Ionicons name='chevron-back' size={26} color='black' />
					<Text
					style={{fontSize: 16}}>Go Back</Text>
				</TouchableOpacity>
			}
			rightbutton={
				<SignOutButton/>
			}
			text='Profile'>
			{children}
		</TopTabNavigator>
	)
}
