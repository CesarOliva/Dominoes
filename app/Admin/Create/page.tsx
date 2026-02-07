"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ImageUploader } from "@/components/upload/multi-image";
import { 
    UploaderProvider,
    type UploadFn
} from "@/components/upload/uploader-provider";
import { useEdgeStore } from "@/utils/edgestore";
import { FormEvent, useCallback, useState } from "react";
import { type JSONContent } from '@tiptap/react'
import ProductEditor from "./_components/Editor";
import { toast } from "sonner";

const CreateProductPage = () => {
    const router = useRouter()
    const { user, loading } = useAuth();
    
    const [descripcion, setDescripcion] = useState<JSONContent | null>(null);
    const {edgestore} = useEdgeStore()
    const [images, setImages] = useState<string[]>([])

    const uploadFn: UploadFn = useCallback(
        async ({ file, onProgressChange, signal }) => {
            const res = await edgestore.publicFiles.upload({
                file,
                signal,
                onProgressChange,
            });
            setImages(prev => [...prev, res.url]);
            return res;
        },[edgestore],
    );
    
    const createProduct = useMutation(api.products.createProduct)

    const [formData, setFormData] = useState({
        nombre: '',
        precio: 0,
        url: '',
        categoria: '',
        subcategoria: '',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    const validateForm = (): boolean => {
        
        if (!formData.nombre.trim()) {
            toast.error('El nombre es requerido')
            return false;
        }
        if (!formData.precio || Number(formData.precio)<=0) {
            toast.error('El precio es requierido');
            return false;
        }
        if (!descripcion) {
            toast.error('Descripción requerida');
            return false;
        }
        if (!formData.url.trim()) {
            toast.error('URL requerida');
            return false;
        }
        if (images.length == 0) {
            toast.error('Imagen requerida');
            return false;
        }
        if (!formData.categoria.trim()) {
            toast.error('Categoria requerida')
            return false;
        }
        if (!formData.subcategoria.trim()) {
            toast.error('Subcategoria requerida');
            return false;
        }
        
        return true;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(descripcion)

       if (!validateForm()) {
            return;
        }

        handleCreate();
    }

    const handleCreate = ()=>{
        const promise = createProduct({
            name: formData.nombre,
            description: JSON.stringify(descripcion),
            price: Number(formData.precio),
            images: images,
            url: formData.url.replace(' ', '_').toLowerCase(),
            onStock: true,
            categoryName: formData.categoria,
            subCategoryName: formData.subcategoria
        })
            .then(()=> router.push('/Admin'));
                
            toast.promise(promise, {
                loading: "Creando producto...",
                success: "Producto creado exitosamente!",
                error: "Error al crear el producto."
            })
    }

    if(loading) return null;

    if(!user) {
        router.push('/')
    }

    return (
        <section className="flex flex-col items-center justify-center mt-8 mb-16">
            <div className="w-[90%] flex flex-col md:flex-row justify-center items-center max-w-300 gap-y-8">
                <form onSubmit={handleSubmit} className="flex w-full flex-col md:flex-row">
                    <div className="w-full md:w-1/2 flex justify-center mb-4 md:mb-0">
                        <div className="rounded-lg object-cover flex items-center justify-center focus:outline-none border border-neutral-700 p-2 size-96 md:size-128">
                            <div className='flex flex-col items-center justify-center gap-2 text-center text-xs text-gray-500 dark:text-gray-400'>
                                <UploaderProvider uploadFn={uploadFn} autoUpload>
                                    <ImageUploader
                                        maxFiles={10}
                                        maxSize={1024 * 1024 * 1} // 1 MB
                                    />
                                </UploaderProvider>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col md:w-1/2 md:ml-4">
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className='text-[30px] font-semibold mb-2 focus:outline-none w-full max-w-215 rounded-md'
                            placeholder="Nombre"
                        />
                        <input
                            type="number"
                            id="precio"
                            name="precio"
                            value={formData.precio}
                            onChange={handleChange}
                            className='text-2xl font-semibold text-[#B86112] mb-2 focus:outline-none w-full max-w-50 rounded-md'
                            placeholder="Precio"
                        />
                        <ProductEditor value={descripcion} onChange={setDescripcion}/>
                        <input 
                            type="text"
                            id="url"
                            name="url"
                            value={formData.url}
                            onChange={handleChange}
                            className='text-lg font-semibold text-neutral-700 mb-2 focus:outline-none w-full max-w-50 rounded-md'
                            placeholder="Slug"
                        />
                        <div className="flex space-x-4">
                            <input
                                type="text"
                                id='categoria'
                                name="categoria"
                                value={formData.categoria}
                                onChange={handleChange}
                                className='text-lg font-semibold text-neutral-700 mb-2 focus:outline-none w-full max-w-50 rounded-md'
                                placeholder="Categoría"
                            />
                            <input
                                type="text"
                                id='subcategoria'
                                name="subcategoria"
                                value={formData.subcategoria}
                                onChange={handleChange}
                                className='text-lg font-semibold text-neutral-700 mb-2 focus:outline-none w-full max-w-50 rounded-md'
                                placeholder="Subcategoría"
                            />
                        </div>
                            
                        <button type="submit" className="bg-[#B86112] hover:bg-[#cb7818] font-semibold text-white h-12 w-36 rounded-lg transition-colors duration-300">GUARDAR</button>
                    </div>
                </form>
            </div>
        </section>
    );
}
 
export default CreateProductPage;