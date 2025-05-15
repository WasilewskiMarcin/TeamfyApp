import { useUser } from '@clerk/clerk-expo'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useEffect, useState, createContext, useContext } from 'react'
import Loader from '@/components/Loader'
import { Id } from '@/convex/_generated/dataModel'

export type ConvexUser = {
	_id: Id<'users'>
	username: string
	image: string
	bio?: string
	clerkId: string
}

type ConvexUserContextType = {
	convexUser: ConvexUser | null
	setConvexUser: (user: ConvexUser) => void
	updateProfile: (data: Partial<Omit<ConvexUser, '_id' | 'clerkId'>>) => Promise<void>
}

export const ConvexUserContext = createContext<ConvexUserContextType | undefined>(undefined)

export const useConvexUser = () => {
	const context = useContext(ConvexUserContext)
	if (!context) {
		throw new Error('useConvexUser must be used within a ConvexUserProvider')
	}
	return context
}

export default function SafeUserProvider({ children }: { children: React.ReactNode }) {
	const { user, isLoaded } = useUser()
	const [loading, setLoading] = useState(true)
	const [convexUser, setConvexUser] = useState<ConvexUser | null>(null)

	const createUser = useMutation(api.users.createUser)
	const updateUser = useMutation(api.users.updateUser)
	const currentUser = useQuery(api.users.getUserByClerkId, user?.id ? { clerkId: user.id } : 'skip')

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
	
	const updateProfile = async (data: Partial<Omit<ConvexUser, '_id' | 'clerkId'>>) => {
		if (!convexUser) return
		const updated = await updateUser({
			_id: convexUser._id,
			clerkId: convexUser.clerkId,
			...data,
		})
		setConvexUser(updated)
	}
	useEffect(() => {
		if (!currentUser) return

		setConvexUser(currentUser)
		setLoading(false)
	}, [currentUser])

	if (loading) {
		return <Loader />
	}

	return (
		<ConvexUserContext.Provider value={{ convexUser, setConvexUser, updateProfile }}>
			{children}
		</ConvexUserContext.Provider>
	)
}
