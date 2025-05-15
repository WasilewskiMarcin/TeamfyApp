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
			image: args.image,
			clerkId: args.clerkId,
			// default valuses must be on end! example: posts: 0, followers: 0, following: 0
		})
	},
})
export const updateUser = mutation({
  args: {
	    _id: v.id('users'),
    clerkId: v.string(),
    username: v.optional(v.string()),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_clerkId', q => q.eq('clerkId', args.clerkId))
      .first()

    if (!user) {
      throw new Error('User not found')
    }

    await ctx.db.patch(user._id, {
      ...(args.username !== undefined && { username: args.username }),
      ...(args.bio !== undefined && { bio: args.bio }),
    })
  },
})
