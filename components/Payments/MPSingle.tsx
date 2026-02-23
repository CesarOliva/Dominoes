"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";

const CheckOutSP = ({
    url
}: {
    url: string
}) => {
    const [loading, setLoading] = useState<boolean>(false);

    const product = useQuery(api.products.getSingleProduct, {url})

    const handlePay = async () =>{
        try{
            setLoading(true);

            if (!product) {
                toast.error('Producto no disponible');
                return;
            }
            const Item = {
                id: product._id,
                title: product.name,
                description: product.name,
                quantity: 1,
                unit_price: Number(product.price),
                picture_url: product.images?.[0],
                currency_id: "MX",
            };

            const res = await fetch('/api/create-preference', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Item)
            })
        
            const data = await res.json();
        
            if(!res.ok){
                toast.error('Hubo un problema con la compra')
                throw new Error('Error al comprar')
            }
        
            if(data.initPoint){
                window.location.href = data.initPoint;
            }else{
                toast.error('Hubo un problema con la compra')
                throw new Error('No se recibio initpoint')
            }
        } catch (error: any){
            toast.error('Hubo un problema con la compra')
        } finally {
            setLoading(false);
        }
    }

    if (product === undefined) {
        return (
            <button disabled className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-wait">Cargando...</button>
        );
    }

    return (
        <button onClick={handlePay} disabled={!product?.onStock || loading} className={`bg-[#B86112] hover:bg-[#cb7818] font-semibold text-white px-4 py-2 rounded-lg transition-colors duration-300 ${product?.onStock ? "cursor-pointer" : "cursor-no-drop"}`}>COMPRAR</button>
    );
}
 
export default CheckOutSP;