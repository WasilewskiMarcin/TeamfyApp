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
	updateProfile: (
    data: Partial<Omit<ConvexUser, '_id' | 'clerkId'>>,
    options?: { checkUsername?: boolean }
  ) => Promise<void>
	// isUsernameAvailable: (username: string) => boolean
	// changeUsername: (newUsername: string) => Promise<void>
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
	const allUsernames = useQuery(api.users.getAllUsernames)
	const [usernameList, setUsernameList] = useState<string[]>([])

	useEffect(() => {
		if (allUsernames) {
			setUsernameList(allUsernames.map(u => u.username))
		}
	}, [allUsernames])

	const isUsernameAvailable = (username: string) => {
		return !usernameList.includes(username)
	}
	// const changeUsername = async (newUsername: string) => {
	// 	if (!convexUser) throw new Error('User not loaded')
	// 	if (!isUsernameAvailable(newUsername)) {
	// 		throw new Error('Username is already taken')
	// 	}

	// 	await updateProfile({ username: newUsername })
	// 	setUsernameList(prev => [...prev, newUsername])
	// }
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

	const updateProfile = async (
		data: Partial<Omit<ConvexUser, '_id' | 'clerkId'>>,
		options?: { checkUsername?: boolean }
	) => {
		if (!convexUser) return

		if (options?.checkUsername && data.username && !isUsernameAvailable(data.username)) {
			throw new Error('Username is already taken')
		}

		const updated = await updateUser({
			_id: convexUser._id,
			clerkId: convexUser.clerkId,
			...data,
		})

		setConvexUser(updated)

		if (data.username) {
			setUsernameList(prev => [...prev, data.username!])
		}
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
