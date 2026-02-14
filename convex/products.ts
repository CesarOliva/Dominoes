import { toast } from "sonner";
import { mutation, MutationCtx, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

//Get if the login email is the same as the one on the table admins
export const getAdmin = query({
    args: {},
    handler: async (ctx) => {
        const admin = await ctx.db
            .query("admins").unique()

        return admin;
    },
})

//Get categories or create if doesnt exist
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
        images: v.array(v.string()),
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
            images: args.images,
            url: args.url,
            onStock: true,
            categoryId: subCategoryId,
        });
    },
});

export const updateProduct = mutation({
    args: {
        id: v.id("products"),
        name: v.string(),
        price: v.number(),
        description: v.string(),
        slug: v.string(),
        category: v.string(),
        subcategory: v.string(),
        images: v.array(v.string())
    },
    handler: async(ctx, args)=> {
        const update = await ctx.db.patch(args.id, {...args});

        return update;
    }
})

//Get categories for the categories Tree
export const getCategories = query({
    args: {},
    handler: async(ctx)=>{
        const categories = await ctx.db
            .query("categories")
            .collect();

        return categories
    }
})

export const getCategoriesByParent = query({
    args: {
        name: v.string()
    },
    handler: async(ctx, args)=>{
        const parent = await ctx.db
            .query("categories")
            .withIndex("by_categoryName", q => 
                q.eq("categoryName", args.name)
            )
            .unique()

        if(!parent) return [];

        const categories = await ctx.db
            .query("categories")
            .withIndex("by_parentCategory", q =>
                q.eq("parentCategory", parent._id)
            )
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

//Get products for /Catalogo
export const getAllProducts = query({
    args: {},
    handler: async (ctx) => {
        const products = await ctx.db
            .query("products").order("desc").collect();

        return products;
    },
});

export const getProductsByCategories = query({
    args: {
        categoryIds: v.optional(v.array(v.id("categories"))),
    },
    handler: async (ctx, args) => {
        if(!args.categoryIds || args.categoryIds.length === 0){
            return await ctx.db.query("products").order("desc").collect()
        }
        return await ctx.db
            .query("products")
            .filter(q =>
                q.or(
                ...args.categoryIds!.map(id =>
                    q.eq(q.field("categoryId"), id)
                )
                )
            )
            .order("desc")
            .collect();
    }
})

//Get products for sections as products and newest
export const getRecentProducts = query({
    args: {},
    handler: async (ctx) => {
        const products = await ctx.db
            .query("products").order("desc").take(4);

        return products
    }
})

//Return the number of products on stock, out of stock and total
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