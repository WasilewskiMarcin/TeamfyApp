// import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
// import { Link } from 'expo-router'
// import { Text, View } from 'react-native'
// import { SignOutButton } from '@/components/SignOutButton'

// // export default function Page() {
// // 	const { user } = useUser()

// // 	return (
// // 		<View>
// // 			<SignedIn>
// // 				<Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
// // 				<SignOutButton />
// // 			</SignedIn>
// // 			<SignedOut>
// // 				<Link href='../(auth)/sign-in'>
// // 					<Text>Sign in</Text>
// // 				</Link>
// // 				<Link href='../(auth)/sign-up'>
// // 					<Text>Sign up</Text>
// // 				</Link>
// // 			</SignedOut>
// // 		</View>
// // 	)
// // }
import { Redirect } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function Index() {
	const { isSignedIn } = useAuth()
	if (isSignedIn) {
		return <Redirect href='../(tabs)' />
	}
	return <Redirect href='./(auth)/login' />
}
