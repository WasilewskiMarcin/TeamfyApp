import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const getUserByClerkId = query({
	args: { clerkId: v.string() },
	handler: async (ctx, args) => {
		return await ctx.db
			.query('users')
			.withIndex('by_clerkId', q => q.eq('clerkId', args.clerkId))
			.first()
	},
})

export const createUser = mutation({
	args: {
		username: v.string(), //MarcinW
		fullname: v.string(), //Marcin Wojciechowski
		email: v.string(),
		bio: v.optional(v.string()), //I am a software engineer
		image: v.string(), //https://example.com/image.png
		clerkId: v.string(), //clerk id
	},
	handler: async (ctx, args) => {
		//check if user already exists in users db by clerkId
		if (
			await ctx.db
				.query('users')
				.withIndex('by_clerkId', q => q.eq('clerkId', args.clerkId))
				.first()
		) {
			return
		}
		//create user in users db
		await ctx.db.insert('users', {
			username: args.username,
			bio: args.bio,
			clerkId: args.clerkId,
			// default valuses must be on end! example: posts: 0, followers: 0, following: 0
		})
	},
})
