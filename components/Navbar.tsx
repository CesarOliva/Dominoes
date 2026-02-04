"use client";

import { ChevronDown, LogOut, Search, ShoppingCart } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from 'next/link';
 import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openCatalogo, setOpenCatalogo] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);
    const catalogoRef = useRef<HTMLLIElement>(null)
    const infoRef = useRef<HTMLLIElement>(null)

    const { logout, user } = useAuth();

    useEffect(()=>{
        const handleClickOutside = (e:MouseEvent) => {
            if(!catalogoRef.current?.contains(e.target as Node) &&
                !infoRef.current?.contains(e.target as Node)){
                setOpenCatalogo(false);
                setOpenInfo(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [])

    return (
        <header className="p-4 bg-white">
            <nav className="flex w-full items-center justify-around">
                <div className="flex items-center">
                    <Link href={'/'}>
                        <img className="h-14" src="/logo.jpg" alt="Logo Dominoes"/>
                    </Link>
                </div>

                <ul className="max-w-md md:max-w-2xl flex-wrap justify-center hidden sm:flex font-semibold gap-x-4 md:gap-x-6 text-md md:text-lg items-center">
                    <Link href={'/'} className="cursor-pointer hover:text-[#B86112]">INICIO</Link>
                    <li ref={catalogoRef} className="relative">
                        <button onClick={()=> setOpenCatalogo(!openCatalogo)} className="flex items-center gap-0.5 hover:text-[#B86112]">
                            CATALOGO
                            <span className={`transition-transform ${openCatalogo ? "rotate-180" : ""}`}>
                                <ChevronDown />
                            </span>
                        </button>

                        {openCatalogo && (
                            <ul className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50 text-sm">
                                <Link href="/Catalogo" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenCatalogo(false)}>VER TODO</Link>
                                <Link href="/Catalogo" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenCatalogo(false)}>MESAS DE JUEGO</Link>
                                <Link href="/Catalogo" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenCatalogo(false)}>PRODUCTOS HOGAR</Link>
                            </ul>
                        )}
                    </li>
                    <Link href={'/Galeria'} className="cursor-pointer hover:text-[#B86112]">GALERÍA</Link>
                    <li ref={infoRef} className="relative">
                        <button onClick={()=> setOpenInfo(!openInfo)} className="flex items-center gap-0.5 hover:text-[#B86112]">
                            INFORMACIÓN
                            <span className={`transition-transform ${openInfo ? "rotate-180" : ""}`}>
                                <ChevronDown />
                            </span>
                        </button>

                        {openInfo && (
                            <ul className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50 text-sm">
                                <Link href="/Quienes-Somos" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenInfo(false)}>¿QUIENES SOMOS?</Link>
                                <Link href="/Aviso-De-Privacidad" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenInfo(false)}>AVISO DE PRIVACIDAD</Link>
                                <Link href="/Politica-De-Garantia" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenInfo(false)}>POLÍTICA DE GARANTÍA</Link>
                                <Link href="/Servicio-Al-Cliente" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenInfo(false)}>SERVICIO AL CLIENTE</Link>
                            </ul>
                        )}
                    </li>
                    <Link href={'/Contacto'} className="cursor-pointer hover:text-[#B86112]">CONTACTO</Link>
                </ul>
                
                <div className="flex gap-4 md:gap-6 items-center">
                    <Search className="size-6"/>
                    {!user ? (
                        <ShoppingCart className="size-6"/>
                    ): (
                        <LogOut className="size-6 cursor-pointer" onClick={logout}/>
                    )}
                    <img onClick={()=> setIsOpen(!isOpen)} className="block sm:hidden size-6" src="/puntos.png" alt="Ilustrativo"/>
                </div>
            </nav>
            {isOpen && (
                <div className="sm:hidden mt-2">
                    <ul className="flex flex-col gap-y-3 font-semibold text-md py-2 text-center">
                        <Link href={'/'} className="cursor-pointer hover:text-[#B86112]">INICIO</Link>
                        <li ref={catalogoRef} className="relative w-full flex items-center justify-center">
                            <button onClick={()=> setOpenCatalogo(!openCatalogo)} className="flex w-full justify-center items-center gap-0.5 hover:text-[#B86112]">
                                CATALOGO
                                <span className={`transition-transform ${openCatalogo ? "rotate-180" : ""}`}>
                                    <ChevronDown />
                                </span>
                            </button>

                            {openCatalogo && (
                                <ul className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50 text-sm">
                                    <Link href="/Catalogo" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenCatalogo(false)}>VER TODO</Link>
                                    <Link href="/Catalogo" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenCatalogo(false)}>MESAS DE JUEGO</Link>
                                    <Link href="/Catalogo" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenCatalogo(false)}>PRODUCTOS HOGAR</Link>
                                </ul>
                            )}
                        </li>
                        <Link href={'/Galeria'} className="cursor-pointer hover:text-[#B86112]">GALERÍA</Link>
                        <li ref={infoRef} className="relative w-full flex items-center justify-center">
                            <button onClick={()=> setOpenInfo(!openInfo)} className="flex w-full justify-center items-center gap-0.5 hover:text-[#B86112]">
                                INFORMACIÓN
                                <span className={`transition-transform ${openInfo ? "rotate-180" : ""}`}>
                                    <ChevronDown />
                                </span>
                            </button>

                            {openInfo && (
                                <ul className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50 text-sm">
                                    <Link href="/Quienes-Somos" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenInfo(false)}>¿QUIENES SOMOS?</Link>
                                    <Link href="/Aviso-De-Privacidad" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenInfo(false)}>AVISO DE PRIVACIDAD</Link>
                                    <Link href="/Politica-De-Garantia" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenInfo(false)}>POLÍTICA DE GARANTÍA</Link>
                                    <Link href="/Servicio-Al-Cliente" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenInfo(false)}>SERVICIO AL CLIENTE</Link>
                                </ul>
                            )}
                        </li>
                        <Link href={'/Contacto'} className="cursor-pointer hover:text-[#B86112]">CONTACTO</Link>
                    </ul>
                </div>
            )}
        </header>
    );
}
 
export default Navbar;