"use client";

import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";
import Product from "@/components/Product";
import { Id } from "@/convex/_generated/dataModel";
import { CategoryTree } from "./_components/Tree";

const CatalogoPage = () => {
    const categories = useQuery(api.products.getCategories);
    const [selected, setSelected] = useState<Id<"categories">[]>([]);

    const products = useQuery(api.products.getProductsByCategories,
        selected.length === 0
        ? "skip"
        : { categoryIds: selected }
    )

    const toggleCategory = (id: Id<"categories">) => {
        setSelected(prev =>
            prev.includes(id)
                ? prev.filter(c => c !== id)
                : [...prev, id]
        );
    };
    
    return (
        <section className="flex items-center justify-center mt-8 mb-16">
            <div className="w-[90%] flex flex-col md:flex-row justify-between max-w-300">
                <aside className="w-full md:w-[20%] px-2 flex flex-col mb-8">
                    <img className="hidden sm:block pl-4 w-48 mb-4" src="/logo.jpg" alt="Logo Dominoes"/>
                    <h3 className="pl-4 font-semibold text-2xl mb-2">Categorías</h3>
                    {categories && (
                        <CategoryTree
                            categories={categories}
                            selected={selected}
                            onToggle={toggleCategory}
                        />
                    )}
                </aside>

                <div className="grid-products w-full md:w-[80%] px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 h-fit mb-16 md:mb-0">
                    {products?.map(({ _id, name, price, images, url }) => (
                        <Product key={_id} name={name} price={price} images={images} url={url}/>
                    ))}
                </div>
            </div>
        </section>
    );
}
 
export default CatalogoPage;