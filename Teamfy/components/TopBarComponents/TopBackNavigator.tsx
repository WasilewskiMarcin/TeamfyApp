import {  Text } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import TopTabNavigator from './TopTabNavigator'

export default function TopBackNavigator({ children }: { children: React.ReactNode }) {
	const navigation = useNavigation()
	return (
		<TopTabNavigator
			button={
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Text>Go Back</Text>
				</TouchableOpacity>
			}
			text='Profile'>
			{children}
		</TopTabNavigator>
	)
}
