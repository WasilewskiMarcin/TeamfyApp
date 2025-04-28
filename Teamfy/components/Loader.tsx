import { View, ActivityIndicator, Text } from 'react-native'
import { COLORS } from '@/constants/theme' 

export default function Loader() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: COLORS.background, // dostosuj jak chcesz
			}}>
			<ActivityIndicator size='large' color={COLORS.primary} />
			<Text style={{ marginTop: 16, color: COLORS.primary, fontSize: 16 }}>Loading...</Text>
		</View>
	)
}
