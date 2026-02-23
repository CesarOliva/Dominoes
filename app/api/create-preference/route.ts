import MercadoPagoConfig, { Preference } from "mercadopago";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try{
        const baseURL = process.env.NEXT_PUBLIC_URL;
        const accessToken = process.env.ACCESS_TOKEN_MP!;

        let body = await request.json();

        let items = body.items || (Array.isArray(body) ? body: [body]);

        if (!Array.isArray(items)) {
            items = [items];
        }
        
        const mpItems = items.map((item: any)=>{
            if(!item.unit_price && !items.price){
                throw new Error('Precio requerido')
            }

            const formattedItem = {
                id: item.id,
                title: item.title,
                description: item.description,
                quantity: Number(item.quantity),
                unit_price: Number(item.unit_price),
                currency_id: item.currency_id,
                picture_url: item.picture_url
            };

            return formattedItem;
        })

        const client = new MercadoPagoConfig({ accessToken })

        const preference = await new Preference(client).create({
            body: {
                items: mpItems,
                back_urls: {
                    success: `${baseURL}/success`,
                    failure: `${baseURL}/failure`,
                    pending: `${baseURL}/pending`,
                },
                // auto_return: "aproved",
                statement_descriptor: "Dominoes",
                external_reference: `order_${Date.now()}`,
            },
        });

        const response = {
            initPoint: preference.init_point || preference.sandbox_init_point,
            preferenceId: preference.id
        };
        
        return NextResponse.json(response);
        
    } catch (error: any){

        console.error({
            message: error.message,
            cause: error.cause,
            status: error.status,
            stack: error.stack
        });
        
        return NextResponse.json(
            { 
                error: 'Error al crear preferencia',
                details: error.message,
                type: error.name
            },
            { status: error.status || 500 }
        );
    }
}