import { View, Text } from 'react-native'

import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function NavigationButtonsProvider({children}: { children: React.ReactNode }) {
    const navigation = useNavigation()
	return(
		<View style={{ flex: 1 }}>
			<View style={{height: 30, backgroundColor: 'black'}}>
                <TouchableOpacity
                onPress={() => { navigation.goBack()}}>
                    <Text>Go Back</Text>
                </TouchableOpacity>
			</View>
				{children}
		</View>
	)
}
