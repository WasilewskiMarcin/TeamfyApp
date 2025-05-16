import { useUser } from '@clerk/clerk-expo'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useEffect, useState, createContext, useContext } from 'react'
import Loader from '@/components/Loader'
import { Id } from '@/convex/_generated/dataModel'
import { useConvex } from 'convex/react'

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
	const convex = useConvex()

	const [loading, setLoading] = useState(true)
	const [convexUser, setConvexUser] = useState<ConvexUser | null>(null)
	const createUser = useMutation(api.users.createUser)
	const updateUser = useMutation(api.users.updateUser)

	const [usernameList, setUsernameList] = useState<string[]>([])

	// Fetch all usernames once, store locally
	useEffect(() => {
		async function fetchUsernames() {
			const allUsernames = await convex.query(api.users.getAllUsernames)
			if (allUsernames) {
				setUsernameList(allUsernames.map(u => u.username))
			}
			console.log('allUsernames', allUsernames)
		}
		fetchUsernames()
	}, [convex])

	const isUsernameAvailable = (username: string) => {
		return !usernameList.includes(username)
	}

	// Fetch current user manually (instead of useQuery)
	useEffect(() => {
		async function fetchCurrentUser() {
			if (!isLoaded) return
			if (!user) {
				//console.error('No user loaded from Clerk')
				setLoading(false)
				return
			}

			setLoading(true)

			// Wywołaj query ręcznie
			const fetchedUser = await convex.query(api.users.getUserByClerkId, {
				clerkId: user.id,
			})

			if (fetchedUser) {
				setConvexUser(fetchedUser)
				setLoading(false)
			} else {
				// Jeśli user nie istnieje w Convex, stwórz go
				try {
					await createUser({
						username: user.username || user.primaryEmailAddress?.emailAddress?.split('@')[0] || '',
						image: user.imageUrl || '',
						clerkId: user.id,
					})
					console.log('✅ User created in Convex!')
					// Pobierz usera ponownie po utworzeniu
					const newUser = await convex.query(api.users.getUserByClerkId, {
						clerkId: user.id,
					})
					setConvexUser(newUser)
				} catch (error) {
					console.error('Error creating user in Convex:', error)
				} finally {
					setLoading(false)
				}
			}
		}

		fetchCurrentUser()
	}, [convex, user, isLoaded, createUser])

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

	if (loading) {
		return <Loader />
	}

	return (
		<ConvexUserContext.Provider value={{ convexUser, setConvexUser, updateProfile }}>
			{children}
		</ConvexUserContext.Provider>
	)
}
