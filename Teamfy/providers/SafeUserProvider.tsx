import { useUser } from '@clerk/clerk-expo'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useEffect, useState } from 'react'
import Loader from '@/components/Loader'
import { ConvexUserContext } from './ConvexUserContext'
export default function SafeUserProvider({ children }: { children: React.ReactNode }) {
	const { user, isLoaded } = useUser()
	const [loading, setLoading] = useState(true)
	const [convexUser, setConvexUser] = useState<any>(null)
	const createUser = useMutation(api.users.createUser)
	const currentUser = useQuery(api.users.getUserByClerkId, user?.id ? { clerkId: user.id } : 'skip')
	// console.log('useQuery getUserByClerkId wywołane', new Date().toISOString(), currentUser)
	useEffect(() => {
		if (!isLoaded) return
		if (!user) {
			console.error('No user loaded from Clerk')
			setLoading(false)
			return
		}
		if (user && !currentUser) {
			setLoading(true)
			createUser({
				username: user.username || user.primaryEmailAddress?.emailAddress?.split('@')[0] || '',
				image: user.imageUrl || '',
				clerkId: user.id,
			})
				.then(() => {
					console.log('✅ User created in Convex!')
				})
				.catch(error => {
					console.error('Error creating user in Convex:', error)
				})
				.finally(() => {
					setLoading(false)
				})
		}
	}, [isLoaded, user, currentUser, createUser])

	// Efekt ustawiający convexUser gdy currentUser jest dostępny
	useEffect(() => {
		if (currentUser) {
			setConvexUser(currentUser)
			setLoading(false)
		}
	}, [currentUser])

	if (loading) {
		return <Loader />
	}

	return <ConvexUserContext.Provider value={{ convexUser, setConvexUser }}>{children}</ConvexUserContext.Provider>
}
