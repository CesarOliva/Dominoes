// convex/orders.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createOrder = mutation({
    args: {
        userId: v.optional(v.string()),
        name: v.string(),
        email: v.string(),
        telefono: v.number(),
        mensaje: v.optional(v.string()),
        calle: v.string(),
        colonia: v.string(),
        cp: v.number(),
        ciudad: v.string(),
        estado: v.string(),
        items: v.array(v.object({
            productId: v.string(),
            name: v.string(),
            price: v.number(),
            quantity: v.number(),
            image: v.optional(v.string()),
        })),
        total: v.number(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        
        const userId = identity?.subject || 'unauth';
        
        const orderId = await ctx.db.insert("orders", {
            userId,
            customerData: {
                name: args.name,
                email: args.email,
                telefono: args.telefono,
                mensaje: args.mensaje || '',
            },
            shippingAddress: {
                calle: args.calle,
                colonia: args.colonia,
                cp: args.cp,
                ciudad: args.ciudad,
                estado: args.estado,
            },
            items: args.items,
            total: args.total,
            status: 'Por confirmar',
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });

        return orderId;
    }
});

// Query para obtener órdenes de un usuario
export const getUserOrders = query({
    args: {
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("orders")
            .withIndex("by_userId", (q) => q.eq("userId", args.userId))
            .order("desc")
            .collect();
    }
});

// Query para obtener una orden específica
export const getOrder = query({
    args: {
        orderId: v.id("orders"),
    },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.orderId);
    }
});

// Mutation para actualizar estado de orden
export const updateOrderStatus = mutation({
    args: {
        orderId: v.id("orders"),
        status: v.string(),
        paymentId: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.orderId, {
            status: args.status,
            updatedAt: Date.now(),
        });
    }
});