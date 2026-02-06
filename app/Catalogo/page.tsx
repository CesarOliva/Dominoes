"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Product from "@/components/Product";
import { Square, SquareCheck } from "lucide-react";
import { useState } from "react";

const CatalogoPage = () => {
    const products = useQuery(api.products.getAllProducts);
    const categories = useQuery(api.products.getCategories)
    
    return (
        <section className="flex items-center justify-center mt-8 mb-16">
            <div className="w-[90%] flex flex-col md:flex-row justify-between max-w-300">
                <aside className="w-full md:w-[20%] px-2 flex flex-col space-y-3 mb-8">
                    <img className="w-48 mb-4" src="/logo.jpg" alt="Logo Dominoes"/>
                    <h3 className="font-semibold text-2xl">Categorías</h3>
                        {categories?.map(({ categoryName }) => (
                            <div className="group flex items-center gap-x-2 px-2 py-1 rounded-md border border-neutral-300 bg-neutral-100">
                                <Square className="cursor-pointer size-6"/> {categoryName}
                            </div>
                        ))}
                    <div className="ml-4 group flex items-center gap-x-2 px-2 py-1 rounded-md border border-neutral-300 bg-neutral-100">
                        <Square className="cursor-pointer size-6"/> Mesas de Poker
                    </div>
                    <div className="ml-4 group flex items-center gap-x-2 px-2 py-1 rounded-md border border-neutral-300 bg-neutral-100">
                        <Square className="cursor-pointer size-6"/> Mesas de Dominó
                    </div>
                    <div className="group flex items-center gap-x-2 px-2 py-1 rounded-md border border-neutral-300 bg-neutral-100">
                        <Square className="cursor-pointer size-6"/> Productos del hogar
                    </div>
                    {/* <p className="leading-relaxed text-lg">Somos fabricantes de mesas de juego personalizadas a medida, ideales para distintos tipos de juego. Partimos de la idea del cliente para diseñar y crear mesas únicas, combinando funcionalidad, diseño y calidad en cada detalle.</p> */}
                </aside>

                <div className="grid-products w-full md:w-[80%] px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 h-fit mb-16 md:mb-0">
                    {products?.map(({ _id, name, price, imageUrl, url }) => (
                        <Product key={_id} name={name} price={price} imageUrl={imageUrl} url={url}/>
                    ))}
                </div>
            </div>
        </section>
    );
}
 
export default CatalogoPage;