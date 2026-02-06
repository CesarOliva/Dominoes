"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ProductEditor from "./_components/Editor";
import { type JSONContent } from '@tiptap/react'
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useEdgeStore } from "@/utils/edgestore";
import { UploadCloudIcon } from "lucide-react";
import { toast } from "sonner";

type FormErrors =  {
    nombre?: string;
    precio?: string;
    descripcion?: string;
    url?: string;
    imageURL?: string; 
    categoria?: string;
    subcategoria?: string;
};

const CreateProductPage = () => {
    const { user, loading } = useAuth();
    const router = useRouter()
    const createProduct = useMutation(api.products.createProduct)

    const [errors, setErrors] = useState<FormErrors>({});
    const [descripcion, setDescripcion] = useState<JSONContent | null>(null);
    const [file, setFile] = useState<File>()
    const {edgestore} = useEdgeStore()
    
    const [formData, setFormData] = useState({
        nombre: '',
        precio: 0,
        url: '',
        imageURL: '',
        categoria: '',
        subcategoria: '',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    
        if (errors[name as keyof FormErrors]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    }

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        
        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre es requerido';
        }
    
        if (!formData.precio || Number(formData.precio)<=0) {
            newErrors.precio = 'Precio requerido';
        }
    
        if (!descripcion) {
            newErrors.descripcion = 'Descripcion requerida'
        }
    
        if (!formData.url.trim()) {
            newErrors.url = 'URL requierida';
        }

        if (!formData.imageURL.trim()) {
            newErrors.url = 'Imagen requerida';
        }

        if (!formData.categoria.trim()) {
            newErrors.categoria = 'Categoría requerida';
        }

        if (!formData.subcategoria.trim()) {
            newErrors.subcategoria = 'Subcategoría requerida';
        }
        
        setErrors(newErrors);
        
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
            imageUrl: formData.imageURL,
            url: formData.url,
            onStock: true,
            categoryName: formData.categoria,
        })
        //    subCategoryName: formData.subcategoria
            .then(()=> router.push(`/Admin`));
                
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
                <form onSubmit={handleSubmit} className="flex w-full">
                    <div className="w-full md:w-1/2 flex justify-center">
                        {formData.imageURL != '' ? (
                            <img className="rounded-lg object-cover size-96 md:size-128" src={formData.imageURL}/>
                        ) : (
                            <div className="rounded-lg object-cover flex items-center justify-center focus:outline-none border border-neutral-700 p-2 size-96 md:size-128">
                                {/* <div className='flex flex-col items-center justify-center gap-2 text-center text-xs text-gray-500 dark:text-gray-400'>
                                    <UploadCloudIcon className="mb-1 size-12" />
                                    <div className="font-medium text-lg">
                                        Click or drag file to this area to upload
                                    </div>
                                </div> */}
                                <input
                                    type="file"
                                    accept="image/"
                                    onChange={(e)=>{
                                        setFile(e.target.files?.[0])
                                    }}
                                    className=""
                                />
                                <button onClick={async () => {
                                    if (file) {
                                        const res = await edgestore.publicFiles.upload({
                                            file
                                        });
                                        formData.imageURL = res.url
                                        console.log(formData.imageURL)
                                    }
                                }}>
                                    Upload
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="w-full flex flex-col md:w-1/2 md:ml-4">
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className={`text-[30px] font-semibold mb-2 focus:outline-none w-full max-w-100 rounded-md ${errors.nombre ? 'text-red-500': ''}`}
                            placeholder="Nombre"
                        />
                        <input
                            type="number"
                            id="precio"
                            name="precio"
                            value={formData.precio}
                            onChange={handleChange}
                            className={`text-2xl font-semibold text-[#B86112] mb-2 focus:outline-none w-full max-w-50 rounded-md ${errors.precio ? 'text-red-500': ''}`}
                            placeholder="Precio"
                        />
                        <ProductEditor value={descripcion} onChange={setDescripcion}/>
                        <input 
                            type="text"
                            id="url"
                            name="url"
                            value={formData.url}
                            onChange={handleChange}
                            className={`text-lg font-semibold text-neutral-700 mb-2 focus:outline-none w-full max-w-50 rounded-md ${errors.url ? 'text-red-500': ''}`}
                            placeholder="Slug"
                        />
                        <div className="flex space-x-4">
                            <input
                                type="text"
                                id='categoria'
                                name="categoria"
                                value={formData.categoria}
                                onChange={handleChange}
                                className={`text-lg font-semibold text-neutral-700 mb-2 focus:outline-none w-full max-w-[150px] rounded-md ${errors.categoria ? 'text-red-500': ''}`}
                                placeholder="Categoría"
                            />
                            <input
                                type="text"
                                id='subcategoria'
                                name="subcategoria"
                                value={formData.subcategoria}
                                onChange={handleChange}
                                className={`text-lg font-semibold text-neutral-700 mb-2 focus:outline-none w-full max-w-[150px] rounded-md ${errors.categoria ? 'text-red-500': ''}`}
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