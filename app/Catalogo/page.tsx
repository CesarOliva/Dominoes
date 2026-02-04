"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Product from "@/components/Product";

const CatalogoPage = () => {
    const products = useQuery(api.products.getAllProducts);
    
    return (
        <section className="flex items-center justify-center mt-8 mb-16">
            <div className="w-[90%] flex flex-col md:flex-row justify-between max-w-300">
                <aside className="w-full md:w-[20%] order-1 md:order-0 px-2 flex flex-col">
                    <img className="w-48 mb-4" src="/logo.jpg" alt="Logo Dominoes"/>
                    <p className="leading-relaxed text-lg">Somos fabricantes de mesas de juego personalizadas a medida, ideales para distintos tipos de juego. Partimos de la idea del cliente para diseñar y crear mesas únicas, combinando funcionalidad, diseño y calidad en cada detalle.</p>
                </aside>

                <div className="w-full md:w-[80%] order-0 md:order-1 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-fit mb-16 md:mb-0">
                    {products?.map(({ _id, name, price, imageUrl, url }) => (
                        <Product key={_id} name={name} price={price} imageUrl={imageUrl} url={url}/>
                    ))}
                </div>
            </div>
        </section>
    );
}
 
export default CatalogoPage;