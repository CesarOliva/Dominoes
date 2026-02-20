import { mutation, query } from "./_generated/server";

export const syncUser = mutation({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity) return

        const existingUser = await ctx.db.query("users")
            .filter(q => q.eq(q.field("clerkId"), identity.subject))
            .unique()

        if(!existingUser){
            await ctx.db.insert("users", {
                clerkId: identity.subject,
                email: identity.email,
                name: identity.name,
                admin: false,
            })
        }
    }
})

export const getCurrentUser = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) return null

        return await ctx.db.query("users")
            .filter(q => q.eq(q.field("clerkId"), identity.subject))
            .unique()
    }
})