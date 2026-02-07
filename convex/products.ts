import { toast } from "sonner";
import { mutation, MutationCtx, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { id } from "zod/v4/locales";

export const getAdmin = query({
    args: {},
    handler: async (ctx) => {
        const admin = await ctx.db
            .query("admins").unique()

        return admin;
    },
})

async function getOrCreateCategory(
    ctx: MutationCtx,
    name: string,
    parentCategory?: Id<"categories">
) {
    const existing = await ctx.db
        .query("categories")
        .withIndex("by_name_parent", q =>
            q.eq("categoryName", name).eq("parentCategory", parentCategory)
        )
        .unique();

    if(existing) return existing._id

    return await ctx.db.insert("categories", {
        categoryName: name,
        parentCategory,
    });
}

export const createProduct = mutation({
    args: {
        name: v.string(),
        description: v.string(),
        price: v.number(),
        imageUrl: v.string(),
        url: v.string(),
        onStock: v.boolean(),
        categoryName: v.string(),
        subCategoryName: v.string(),
    },
    handler: async (ctx, args) => {
        const existingProduct = await ctx.db
            .query("products")
            .withIndex("by_url", q => q.eq("url", args.url))
            .unique();

        if (existingProduct) {
            toast.error('La url del producto ya existe')
            throw new Error("La URL del producto ya existe");
        }

        const categoryId = await getOrCreateCategory(
            ctx,
            args.categoryName
        )

        const subCategoryId = await getOrCreateCategory(
            ctx,
            args.subCategoryName,
            categoryId,
        )

        return await ctx.db.insert("products", {
            name: args.name,
            description: args.description,
            price: args.price,
            imageUrl: args.imageUrl,
            url: args.url,
            onStock: true,
            categoryId: subCategoryId,
        });
    },
});

export const getCategories = query({
    args: {},
    handler: async(ctx)=>{
        const categories = await ctx.db
            .query("categories")
            .collect();

        return categories
    }
})

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
            .query("products").order("desc").collect();

        return products;
    },
});

export const getRecentProducts = query({
    args: {},
    handler: async (ctx) => {
        const products = await ctx.db
            .query("products").order("desc").take(4);

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