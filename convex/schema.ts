import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    products: defineTable({
        name: v.string(),
        description: v.string(),
        price: v.number(),
        imageUrl: v.string(),
        url: v.string(),
        onStock: v.boolean(),
    })
    .index("by_url", ["url"]),

    admins: defineTable({
        email: v.string(),
    })
    .index("by_email", ["email"]),
});