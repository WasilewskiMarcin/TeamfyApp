import { View, Text } from 'react-native'
import React from 'react'
import TopBackNavigator from '@/components/TopBarComponents/TopBackNavigator'
export default function ProfileScreen() {
	return (
		<TopBackNavigator>
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>ProfileScreen</Text>
			</View>
		</TopBackNavigator>
	)
}
