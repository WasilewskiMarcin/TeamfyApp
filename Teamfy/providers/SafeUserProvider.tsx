import { useUser } from '@clerk/clerk-expo'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useEffect, useState } from 'react'
import Loader from '@/components/Loader'

export default function SafeUserProvider({ children }: { children: React.ReactNode }) {
	
	const { user, isLoaded } = useUser()
	const [loading, setLoading] = useState(true)
	const createUser = useMutation(api.users.createUser)
	const currentUser = useQuery(api.users.getUserByClerkId, user?.id ? { clerkId: user.id } : 'skip')
	
	
	useEffect(() => {
		const setupUser = async () => {
			if (!isLoaded) return //if clerk is not loaded yet, do nothing

			//if currentUser exists, do nothing
			if (currentUser) {
				setLoading(false)
				return
			}

			// if dont have user data
			if (!user) {
				console.error('No user loaded from Clerk')
				setLoading(false)
				return
			}
			 //if user not exists in Convex, create it
			if (!currentUser && user) {
				try {
					await createUser({
						username: user.username || user.primaryEmailAddress?.emailAddress?.split('@')[0] || '',
						image: user.imageUrl || '',
						clerkId: user.id,
					})
					console.log('✅ User created in Convex!')
				} catch (error) {
					console.error('Error creating user in Convex:', error)
				}
			}
			setLoading(false)
		}
		setupUser()
	}, [isLoaded, user])
	if (loading) {
		return <Loader />
	}
	return <>{children}</>
}
