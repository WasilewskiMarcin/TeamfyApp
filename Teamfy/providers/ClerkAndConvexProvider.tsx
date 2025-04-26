import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { ConvexReactClient } from 'convex/react'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
if (!publishableKey) {
	throw new Error('Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in .env')
}
const convexClient = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, { unsavedChangesWarning: false })

export default function ClerkAndConvexProvider({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
			<ConvexProviderWithClerk useAuth={useAuth} client={convexClient}>
				<ClerkLoaded>{children}</ClerkLoaded>
			</ConvexProviderWithClerk>
		</ClerkProvider>
	)
}
