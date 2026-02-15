"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Product from "@/components/Product";
import { useCatalogFilters } from "@/utils/catalogFilters";

const MesasPage = () => {
    const categories = useQuery(api.products.getCategoriesByParent, {name: "Mesas de juego"});
    
    const {
        selectedCategories,
        toggleCategory,
    } = useCatalogFilters();

    const products = useQuery(api.products.getProductsByCategories, {
        parentName: "Mesas de juego",
        categoryIds: selectedCategories,
    })
    
    return (
        <section className="flex items-center justify-center mt-8 mb-16">
            <div className="w-[90%] flex flex-col md:flex-row justify-between max-w-300">
                <aside className="w-full md:w-[20%] px-2 flex flex-col mb-8">
                    <img className="hidden sm:block w-48 mb-4" src="/logo.jpg" alt="Logo Dominoes"/>
                    <h3 className="font-semibold text-2xl mb-2">Categorías</h3>
                    {categories?.map((cat)=> (
                        <label key={cat._id} className="flex items-center gap-2 text-md border border-neutral-300 bg-[#eee] rounded px-2 py-1 mb-2">
                            <input
                                className="size-4 accent-[#B86112]"
                                type="checkbox"
                                checked={selectedCategories.includes(cat._id)}
                                onChange={() => toggleCategory(cat._id)}
                            />
                            {cat.categoryName}
                        </label>
                    ))}
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
 
export default MesasPage;