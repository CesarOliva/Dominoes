import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAdmin = query({
    args: {},
    handler: async (ctx) => {
        const admin = await ctx.db
            .query("admins").unique()

        return admin;
    },
})

export const createProduct = mutation({
    args: {
        name: v.string(),
        description: v.string(),
        price: v.number(),
        imageUrl: v.string(),
        url: v.string(),
        onStock: v.boolean(),
        categoryName: v.string(),
        parentCategory: v.optional(v.id("categories"))
    },
    handler: async (ctx, args) => {
        const existingCategory = await ctx.db
            .query("categories")
            .withIndex("by_name_parent", q =>
                q.eq("categoryName", args.name).eq("parentCategory", args.parentCategory)
            )
            .unique();

        let categoryId;

        if(existingCategory){
           categoryId =  existingCategory._id
        }else{
            categoryId = await ctx.db.insert("categories", {
                categoryName: args.name,
                parentCategory: args.parentCategory,
            })
        }

        const existingProduct = await ctx.db
            .query("products")
            .withIndex("by_url", q => q.eq("url", args.url))
            .unique();

        if (existingProduct) {
            throw new Error("La URL del producto ya existe");
        }

        return await ctx.db.insert("products", {
            name: args.name,
            description: args.description,
            price: args.price,
            imageUrl: args.imageUrl,
            url: args.url,
            onStock: true,
            categoryId
        });
    },
});

export const getSingleProduct = query({
    args: {
        url: v.string(),
    },
    handler: async (ctx, { url }) => {
        const product =  await ctx.db
            .query("products")
            .withIndex("by_url", q => q.eq("url", url))
            .unique();

        return product;
    },
});

export const removeProduct = mutation({
    args: {
        url: v.string(),
    },
    handler: async (ctx, { url }) => {
        const product =  await ctx.db
            .query("products")
            .filter((q) => q.eq(q.field("url"), url))
            .first()

        if(!product){
            throw new Error("Product not found")
        }

        await ctx.db.delete(product._id)

        return product._id;
    },
})

export const getAllProducts = query({
    args: {},
    handler: async (ctx) => {
        const products = await ctx.db
            .query("products").collect();

        return products;
    },
});

export const getRecentProducts = query({
    args: {},
    handler: async (ctx) => {
        const products = await ctx.db
            .query("products").take(4);

        return products
    }
})

export const getProductsStats = query({
    args: {},
    handler: async(ctx) => {
        const products = await ctx.db.query("products").collect();
        
        const totalProducts = products.length;
        const inStock = products.filter(p => p.onStock).length;
        const outOfStock = products.filter(p => !p.onStock).length;

        return {
            totalProducts,
            inStock,
            outOfStock
        }
    }
})