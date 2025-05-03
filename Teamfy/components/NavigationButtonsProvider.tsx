import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from 'expo-router'

export default function NavigationButtonsProvider({children}: { children: React.ReactNode }) {
    const navigation = useNavigation()
	return(
		<View style={{ flex: 1 }}>
			<View style={{height: 30}}>
                <TouchableOpacity
                onPress={() => {navigation.goBack()}}>
                    <Text>Go Back</Text>
                </TouchableOpacity>
			</View>
				{children}
		</View>
	)
}
