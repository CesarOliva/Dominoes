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
        categoryId: v.id("categories")
    })
    .index("by_url", ["url"])
    .index("by_category", ["categoryId"]),

    categories: defineTable({
        categoryName: v.string(),
        parentCategory: v.optional(v.id("categories")),
    })
    .index("by_name_parent", ["categoryName", "parentCategory"])
    .index("by_parent", ["parentCategory"]),

    admins: defineTable({
        email: v.string(),
    })
    .index("by_email", ["email"]),
});