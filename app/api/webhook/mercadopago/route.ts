import { NextResponse } from 'next/server';
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        if (body.action === 'payment.created' || body.action === 'payment.updated') {
            const paymentId = body.data.id;
            
            const paymentInfo = body.data;
            
            const orderId = paymentInfo.external_reference;
            
            if (paymentInfo.status === 'approved') {
                await convex.mutation(api.orders.updateOrderStatus, {
                    orderId,
                    status: 'Pagado',
                    paymentId: paymentId.toString(),
                });
            }
        }
        
        return NextResponse.json({ received: true });
        
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json(
            { error: 'Error processing webhook' },
            { status: 500 }
        );
    }
}