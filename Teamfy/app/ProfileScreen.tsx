import { View, Text } from 'react-native'
import React from 'react'
import NavigationButtonsProvider from '@/components/NavigationButtonsProvider'
export default function ProfileScreen() {
	return (
		<NavigationButtonsProvider >
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>ProfileScreen</Text>
			</View>
		</NavigationButtonsProvider>
	)
}
