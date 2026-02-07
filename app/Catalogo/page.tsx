"use client";

import { useQuery } from "convex/react";
import { useMemo } from "react";
import { api } from "../../convex/_generated/api";
import { Square, SquareCheck } from "lucide-react";
import { categoryTree } from "./_components/Tree";
import { Tree } from "./_components/Tree"
import Product from "@/components/Product";

const CatalogoPage = () => {
    const products = useQuery(api.products.getAllProducts);
    const categories = useQuery(api.products.getCategories)

    const tree = useMemo(()=>{
        if(!categories) return [];
        return categoryTree(categories);
    }, [categories])
    
    return (
        <section className="flex items-center justify-center mt-8 mb-16">
            <div className="w-[90%] flex flex-col md:flex-row justify-between max-w-300">
                <aside className="w-full md:w-[20%] px-2 flex flex-col mb-8">
                    <img className="hidden sm:block pl-4 w-48 mb-4" src="/logo.jpg" alt="Logo Dominoes"/>
                    <h3 className="pl-4 font-semibold text-2xl mb-2">Categorías</h3>
                        <Tree categories={tree}/>
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