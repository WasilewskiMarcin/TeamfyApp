import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
	users: defineTable({
		// id: v.id('users'), //user id but created by convex
		// createdAt: v.date('createdAt'), //date when user was created but created by convex too
		username: v.string(), //MarcinW
		bio: v.optional(v.string()), //I am a software engineer
		clerkId: v.string(), //clerk id
	}).index('by_clerkId', ['clerkId']), //get user by clerkId  example: getUserByClerkId(123) => {id: 123, username: 'MarcinW', fullname: 'Marcin Wojciechowski', email: mw@gmail.com, bio: 'I am a software engineer', image: 'https://example.com/image.png', clerkId: 123}
})
