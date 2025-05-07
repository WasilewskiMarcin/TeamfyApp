import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function ProfileButton() {
	const navigation = useNavigation<any>()
	return (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate('Profile')
			}}>
			<Ionicons name='person-circle-outline' size={28} color='black' />
		</TouchableOpacity>
	)
}
