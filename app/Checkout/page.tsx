"use client";

import CheckOutSP from "@/components/Payments/MPSingle";
import { api } from "@/convex/_generated/api";
import { useCheckoutStore } from "@/utils/checkoutStore";
import { formatearMoneda } from "@/utils/CurrencyFormat";
import { useQuery } from "convex/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface Contacto {
    nombre: string;
    email: string;
    telefono: number;
    mensaje: string;
}

interface Direccion {
    calle: string;
    colonia: string;
    cp: number;
    ciudad: string;
    estado: string;
}

const Checkout = () => {
    const url = useCheckoutStore((s)=> s.productSlug)
    const router = useRouter()

    if(!url){
        return <div>No hay producto seleccionado</div>
    }

    const user = useQuery(api.users.getCurrentUser);
    const product = useQuery(api.products.getSingleProduct, {url})    

    const [currentStep, setCurrentStep] = useState<number>(1);

    const [contactData, setContactData] = useState<Contacto>({
        nombre: '',
        email: '',
        telefono: 0,
        mensaje: '',
    });

    const [addressData, setAddressData] = useState<Direccion>({
        calle: '',
        colonia: '',
        cp: 0,
        ciudad: '',
        estado: '',
    })

    useEffect(() => {
        if (user) {
            setContactData(prev => ({
                ...prev,
                nombre: user.name || '',
                email: user.email || '',
            }));
        }
    }, [user]);
    
    const handleContactChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setContactData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddressChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setAddressData((prev) => ({
            ...prev,
            [name]: value
        }));
  };

    const handleFirstSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCurrentStep(2);
    };

    const handleSecondSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setCurrentStep(3);
    };

    const goToPreviousStep = ()=>{
        setCurrentStep(1)
    }

    if (product === undefined) {
        return (
            <button disabled className="bg-gray-400 text-white px-6 py-3 rounded-lg cursor-wait">Cargando...</button>
        );
    }

    return (
        <section className="flex items-center justify-center py-16 md:mb-0">
            <div className="w-[90%] flex flex-col md:flex-row justify-center max-w-300">
                <div className="order-1 md:order-0 px-6 py-4 w-full md:w-1/2 text-center md:text-start">
                    {currentStep === 1 && (
                        <>
                            <h2 className='text-4xl font-semibold mb-4'>Información de Contacto</h2>
                            <form onSubmit={handleFirstSubmit} className='flex flex-col gap-y-2'>
                                <div className='flex flex-row items-center gap-x-2'>
                                    <label htmlFor="nombre" className='text-lg '>Nombre:</label>
                                    <input
                                        className='w-full p-2 border border-neutral-300 rounded-md'
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        value={contactData.nombre}
                                        onChange={handleContactChange}
                                        required
                                        placeholder="Nombre"
                                    />
                                </div>

                                <div className='flex flex-row items-center gap-x-2'>
                                    <label htmlFor="correo" className='text-lg '>Correo:</label>
                                    <input
                                        className='w-full p-2 border border-neutral-300 rounded-md'
                                        type="text"
                                        id="correo"
                                        name="correo"
                                        value={contactData.email}
                                        onChange={handleContactChange}
                                        required
                                        placeholder="Email"
                                    />
                                </div>

                                <div className='flex flex-row items-center gap-x-2'>
                                    <label htmlFor="telefono" className='text-lg '>Telefono:</label>
                                    <input
                                        className='w-full p-2 border border-neutral-300 rounded-md'
                                        type="number"
                                        id="telefono"
                                        name="telefono"
                                        value={contactData.telefono}
                                        onChange={handleContactChange}
                                        required
                                        placeholder="Telefono"
                                    />
                                </div>

                                <div className='flex flex-col gap-x-2'>
                                    <label htmlFor="mensaje" className='text-lg '>Mensaje:</label>
                                    <textarea
                                        className='p-2 min-h-16 max-h-32 border border-neutral-300 rounded-md'
                                        id="mensaje"
                                        name="mensaje"
                                        value={contactData.mensaje}
                                        onChange={handleContactChange}
                                        placeholder="Escribe tu mensaje..."
                                    />
                                </div>

                                <div className='flex justify-end mt-2'>
                                    <button 
                                        className={`bg-[#B86112] hover:bg-[#cb7818] font-semibold text-white px-4 py-2 rounded-lg transition-colors duration-300 cursor-pointer`}
                                        type="submit"
                                    >
                                    SIGUIENTE
                                    </button>
                                </div>
                            </form>
                        </>
                    )}

                    {currentStep == 2 && (
                        <>
                            <h2 className='text-4xl font-semibold mb-4'>Información de Dirección</h2>
                            <form onSubmit={handleSecondSubmit} className='flex flex-col gap-y-2'>
                                <div className='flex flex-row items-center gap-x-2'>
                                    <label htmlFor="calle" className='text-lg '>Calle:</label>
                                    <input
                                        className='w-full p-2 border border-neutral-300 rounded-md'
                                        type="text"
                                        id="calle"
                                        name="calle"
                                        value={addressData.calle}
                                        onChange={handleAddressChange}
                                        required
                                        placeholder="Calle y número"
                                    />
                                </div>

                                <div className='flex flex-row items-center gap-x-2'>
                                    <label htmlFor="colonia" className='text-lg '>Colonia:</label>
                                    <input
                                        className='w-full p-2 border border-neutral-300 rounded-md'
                                        type="text"
                                        id="colonia"
                                        name="colonia"
                                        value={addressData.colonia}
                                        onChange={handleAddressChange}
                                        required
                                        placeholder="Colonia"
                                    />
                                </div>

                                <div className='flex flex-row items-center gap-x-2'>
                                    <label htmlFor="cp" className='text-lg '>CP:</label>
                                    <input
                                        className='w-full p-2 border border-neutral-300 rounded-md'
                                        type="number"
                                        id="cp"
                                        name="cp"
                                        value={addressData.cp}
                                        onChange={handleAddressChange}
                                        required
                                        placeholder="Código Postal"
                                    />
                                </div>

                                <div className='flex flex-row items-center gap-x-2'>
                                    <label htmlFor="ciudad" className='text-lg '>Ciudad:</label>
                                    <input
                                        className='w-full p-2 border border-neutral-300 rounded-md'
                                        type="text"
                                        id="ciudad"
                                        name="ciudad"
                                        value={addressData.ciudad}
                                        onChange={handleAddressChange}
                                        required
                                        placeholder="Ciudad"
                                    />
                                </div>

                                <div className='flex flex-row items-center gap-x-2'>
                                    <label htmlFor="estado" className='text-lg '>Estado:</label>
                                    <input
                                        className='w-full p-2 border border-neutral-300 rounded-md'
                                        type="text"
                                        id="estado"
                                        name="estado"
                                        value={addressData.estado}
                                        onChange={handleAddressChange}
                                        required
                                        placeholder="Estado"
                                    />
                                </div>

                                <div className='flex justify-end mt-2'>
                                    <button type="button"
                                        className={`bg-neutral-800 hover:bg-neutral-700 font-semibold text-white px-4 py-2 rounded-lg transition-colors duration-300 mr-2 cursor-pointer`}
                                        onClick={goToPreviousStep}
                                    >
                                        ANTERIOR
                                    </button>
                                    <button 
                                        className={`bg-[#B86112] hover:bg-[#cb7818] font-semibold text-white px-4 py-2 rounded-lg transition-colors duration-300 cursor-pointer`}
                                        type="submit"
                                    >
                                    SIGUIENTE
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>

                <div className="order-0 md:order-1 px-6 py-4 w-full md:w-1/2 flex flex-col">
                    <>
                        <h2 className='text-4xl font-semibold mb-4'>Resumen del pedido</h2>
                        <div className="flex flex-col">
                            <div className="flex">
                                <Link href={`/Productos/${product?.url}`} className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden shrink-0">
                                    <img src={product?.images[0]} alt={product?.name} className="w-full h-full object-cover"/>
                                </Link>
                                <div className="ml-3">
                                    <Link href={`/Productos/${product?.url}`} className="font-medium text-lg text-gray-800 truncate pr-2">{product?.name}</Link>
                                    <p className='text-md font-medium text-[#B86112] mb-2'>{formatearMoneda(product!.price)}</p>
                                </div>
                            </div>

                            <div className="border-t mt-4 border-gray-200 p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-semibold text-gray-700">Total:</span>
                                    <span className="text-xl font-bold text-[#B86112]">{formatearMoneda(product!.price)}</span>
                                </div>
                                
                                <div className='flex justify-end mt-2'>
                                    <CheckOutSP url={url}/>
                                </div>
                            </div>
                        </div>

                    </>
                </div>
            </div>
        </section>
    );
}
 
export default Checkout;