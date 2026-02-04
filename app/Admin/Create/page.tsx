"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router";
import ProductEditor from "./_components/Editor";
import { type JSONContent } from '@tiptap/react'
// import { uploadToCloudinary } from "../lib/Cloudinary";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";


const CreateProductPage = () => {
    const { user, loading } = useAuth();
    const [nombre, setNombre] =  useState('')
    const [precio, setPrecio] =  useState<number>(0)
    const [url, setUrl] =  useState('')
    const [description, setDescription] = useState<JSONContent | null>(null)
    const [image, setImage] = useState<File | null>(null);
    const [imageURL, setImageURL] =  useState('')
    const createProduct = useMutation(api.products.createProduct)

    const handleCreate = ()=>{
        createProduct({
            name: nombre,
            description: 'description',
            price: precio,
            imageUrl: imageURL,
            url: url
        })
    }

    const handleImageUpload = async () => {
        console.log(image)
        if(!image) return
        // const url = await uploadToCloudinary(image)
        setImageURL(url)
    }

    if(loading) return null;

    if(!user) {
        return <Navigate to={'/'}/>
    }

    return (
        <section className="flex flex-col items-center justify-center mt-8 mb-16">
            <div className="w-[90%] flex flex-col md:flex-row justify-center items-center max-w-300 gap-y-8">
                <form className="flex w-full " onSubmit={handleCreate}>
                    <div className="w-full md:w-1/2 flex justify-center">
                        {imageURL ? (
                            <img className="rounded-lg object-cover size-96 md:size-128" src={imageURL}/>
                        ) : (
                            <input onChange={(e) => setImage(e.target.files?.[0] ?? null)} type="file" accept="image/" className="rounded-lg object-cover focus:outline-none border border-neutral-700 p-2 size-96 md:size-128"/>
                        )}

                        <button className="bg-red-100" onClick={handleImageUpload}>
                        Subir imagen
                        </button>
                    </div>
                    <div className="w-full flex flex-col md:w-1/2 md:ml-4">
                        <input onChange={(e)=>setNombre(e.target.value)} type="text" className="text-[30px] font-semibold mb-2 focus:outline-none w-full max-w-100" placeholder="Nombre"/>
                        <input onChange={(e)=>setPrecio(90)} type="number" className="text-2xl font-semibold text-[#B86112] mb-2 focus:outline-none w-full max-w-[150px]" placeholder="Precio"/>
                        <ProductEditor value={description} onChange={setDescription}/>
                        <input onChange={(e)=>setUrl(e.target.value)} type="text" className="text-lg font-semibold text-neutral-700 mb-2 focus:outline-none w-full max-w-75" placeholder="Slug"/>
                        <input type="text" className="text-lg font-semibold text-neutral-700 mb-2 focus:outline-none w-full max-w-75" placeholder="Categorias"/>
                        <button type="submit" className="bg-[#B86112] hover:bg-[#cb7818] font-semibold text-white h-12 w-36 rounded-lg transition-colors duration-300">GUARDAR</button>
                    </div>
                </form>
            </div>
        </section>
    );
}
 
export default CreateProductPage;