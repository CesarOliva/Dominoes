import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    products: defineTable({
        name: v.string(),
        description: v.string(),
        price: v.number(),
        images: v.array(v.string()),
        url: v.string(),
        onStock: v.boolean(),
        categoryId: v.id("categories")
    })
    .index("by_url", ["url"])
    .index("by_category", ["categoryId"]),

    categories: defineTable({
        categoryName: v.string(),
        parentCategory: v.optional(v.id("categories")),
    })
    .index("by_categoryName", ["categoryName"])
    .index("by_parentCategory", ["parentCategory"])
    .index("by_name_parent", ["categoryName", "parentCategory"]),

    //To compare at login to accept
    users: defineTable({
        clerkId: v.string(),
        email: v.optional(v.string()),
        name: v.optional(v.string()),
        admin: v.boolean()
    })
    .index("by_role", ["admin"]),
});