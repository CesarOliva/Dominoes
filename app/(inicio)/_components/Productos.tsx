"use client";

import { useQuery } from "convex/react";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import Product from "@/components/Product";

const Productos = () => {
    const products = useQuery(api.products.getRecentProducts)

    return (
        <section className="flex items-center justify-center py-16 md:mb-0 bg-[#eeeeee]">
            <div className="w-[90%] flex flex-col items-center justify-center max-w-300">
                <div className="flex w-full items-center justify-between mb-6">
                    <span className="text-lg font-medium text-black">Lo nuevo</span>
                    <Link href={'/Mesas-De-Juego'} className="text-md font-semibold text-black px-4 py-2 border-2 border-black">VER TODOS</Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 md:gap-8">
                    {products?.map(({ _id, name, price, images, url }) => (
                        <Product key={_id} name={name} price={price} images={images} url={url}/>
                    ))}
                </div>
            </div>
        </section>
    );
}
 
export default Productos;