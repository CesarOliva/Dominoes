import { mutation, query } from "./_generated/server";
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
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("products")
            .withIndex("by_url", q => q.eq("url", args.url))
            .unique();

        if (existing) {
            throw new Error("La URL del producto ya existe");
        }

        return await ctx.db.insert("products", {
            ...args,
            onStock: true,
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