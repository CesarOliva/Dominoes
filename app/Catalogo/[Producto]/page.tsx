"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { generateHTML } from '@tiptap/html'
import StarterKit from "@tiptap/starter-kit";
import { formatearMoneda } from "@/utils/CurrencyFormat";
import Product from "@/components/Product";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useEditProduct } from "@/utils/editProduct";
import { Description } from "@radix-ui/react-alert-dialog";

const ProductoPage = () => {
    const { user, loading } = useAuth();

    const router = useRouter();
    const params = useParams<{ Producto: string }>();
    const producto = params.Producto;

    const product = useQuery(api.products.getSingleProduct,
        producto ? { url: producto } : "skip"
    );
    
    const products = useQuery(api.products.getRecentProducts)

    const [descriptionJson, setDescriptionJson] = useState<any>(null);
    const [image, setImage] = useState<string | null>(null)
0
    const descriptionHtml = useMemo(() => {
        if (!product?.description) return '';
        
        try {
            const json = JSON.parse(product.description);
            return generateHTML(json, [
                StarterKit
            ]);
        } catch (error) {
            return '<p>Error al cargar descripción</p>';
        }
    }, [product?.description]);

    const setProductToEdit = useEditProduct(
        (state) => state.setProductToEdit
    );

    useEffect(()=>{
        if(product?.description){
            try{
                const json = JSON.parse(product.description)
                setDescriptionJson(json);
            } catch(error){
                toast.error("Error al cargar el producto")
            }
        }
        if(product?.images.length){
            setImage(product!.images[0])
        }
    }, [product])

    
    if (product === undefined || !product || !descriptionJson) {
        return(
            <section className="flex flex-col items-center justify-center mt-8 mb-16">
                <div className="w-[90%] flex flex-col md:flex-row justify-center items-center max-w-300 gap-y-8">
                    <div className="w-full md:w-1/2 flex justify-center animate-pulse">
                        <div className="rounded-lg size-96 md:size-128 bg-gray-300"></div>
                    </div>
                    <div className="w-full md:w-1/2 md:ml-4">
                        <div className="h-8 w-3/4 bg-gray-300 rounded mb-2 animate-pulse"></div>
                        <div className="h-6 w-1/4 bg-gray-300 rounded mb-2 animate-pulse"></div>
                        <div className="h-4 w-full bg-gray-300 rounded mb-4 animate-pulse"></div>
                        <div className="h-10 w-1/3 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                </div>
            </section>
        )
    }

    if (product === null){
        router.push('/404')
    }

    if(loading) return null

    return (
        <section className="flex flex-col items-center justify-center mt-8 mb-16">
            <div className="w-[90%] flex flex-col md:flex-row justify-center max-w-300 gap-y-8">
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
                    <img className="rounded-lg object-cover size-96 md:size-128" src={image!} alt={product?.name}/>
                    <div className="w-full flex max-w-96 md:max-w-lg mt-3 gap-x-2">
                        {product.images.map(image => 
                            <img onClick={()=>setImage(image)} key={image} className="bg-white opacity-60 hover:opacity-100 cursor-pointer size-24 rounded-md" src={image} alt={product.name} />
                        )}
                    </div>
                </div>
                <div className="w-full md:w-1/2 md:ml-4">
                    <h2 className="text-[30px] font-semibold mb-2">{product?.name}</h2>
                    <p className="text-2xl font-semibold text-[#B86112] mb-2">{formatearMoneda(product!.price)}</p>
                    <div className="prose text-lg font-normal mb-4 tiptap" dangerouslySetInnerHTML={{ __html: descriptionHtml }}/>
                    {!user ? (
                        <button className="bg-[#B86112] hover:bg-[#cb7818] font-semibold text-white px-6 py-3 rounded-lg transition-colors duration-300">COMPRAR</button>
                    ) : (
                        <button onClick={()=> {
                            setProductToEdit({
                                _id: product._id,
                                name: product.name,
                                price: product.price,
                                description: product.description,
                                slug: product.url,
                                category: product.categoryId,
                                images: product.images
                            });
                            router.push("/Admin/Create")
                        }} 
                        className="bg-[#B86112] hover:bg-[#cb7818] font-semibold text-white px-6 py-3 rounded-lg transition-colors duration-300">
                            EDITAR
                        </button>
                    )}
                </div>
            </div>

            <div className="w-[90%] max-w-300 mt-16">
                <h2 className="text-3xl font-semibold mb-2">Productos Destacados</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {products?.map(({ _id, name, price, images, url }) => (
                        <Product key={_id} name={name} price={price} images={images} url={url}/>
                    ))}
                </div>
            </div>
        </section>
    );
}
 
export default ProductoPage;