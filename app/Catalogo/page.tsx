"use client";

import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";
import Product from "@/components/Product";
import { Id } from "@/convex/_generated/dataModel";
import { CategoryTree, getAllChildren } from "./_components/Tree";
import { useCatalogFilters } from "@/utils/catalogFilters";

const CatalogoPage = () => {
    const {
        selectedCategories,
        toggleCategory,
    } = useCatalogFilters();

    const categories = useQuery(api.products.getCategories);

    const expandedCategoryIds = categories
        ? Array.from(
            new Set(
                selectedCategories.flatMap(id => {
                    const hasChildren = categories.some(
                        c => c.parentCategory === id
                    )

                    return hasChildren
                        ? getAllChildren(id, categories)
                        : id
                })
            )
        ): [];

    const products = useQuery(api.products.getProductsByCategories, {
        categoryIds: expandedCategoryIds,
    })
    
    return (
        <section className="flex items-center justify-center mt-8 mb-16">
            <div className="w-[90%] flex flex-col md:flex-row justify-between max-w-300">
                <aside className="w-full md:w-[20%] px-2 flex flex-col mb-8">
                    <img className="hidden sm:block pl-4 w-48 mb-4" src="/logo.jpg" alt="Logo Dominoes"/>
                    <h3 className="pl-4 font-semibold text-2xl mb-2">Categorías</h3>
                    {categories && (
                        <CategoryTree
                            categories={categories}
                            selected={selectedCategories}
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