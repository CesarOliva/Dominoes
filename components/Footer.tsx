"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const Footer = () => {
    const [openCatalogo, setOpenCatalogo] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);
    const catalogoRef = useRef<HTMLLIElement>(null)
    const infoRef = useRef<HTMLLIElement>(null);

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
        <footer className="flex items-center justify-center pt-8 bg-white">
            <div className="w-[90%] flex flex-col items-center justify-center max-w-300">
                <img src="/logo.jpg" alt="Logo Dominoes" className="h-16 mb-4"/>
                <p className="text-black font-normal text-lg mb-8">Tu mesa de juegos</p>
                <div className="flex gap-8 mb-12">
                    <a target="_blank" href="https://www.facebook.com/mesasdejuegopersonalizadas">
                        <img className='size-10' src="/facebook.svg" alt="Facebook Dominoes"/>
                    </a>
                    <a target="_blank" href="#">
                        <img className='size-10' src="/instagram.svg" alt="Instagram Dominoes"/>
                    </a>
                </div>
                <div className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 w-full items-center justify-between mb-12">
                    <span className="text-lg">® DOMINOES 2026</span>
                    <ul className="flex flex-col md:flex-row items-center font-medium gap-x-4 text-lg">
                        <Link href={'/'} className="cursor-pointer hover:text-[#B86112]">INICIO</Link>
                        <li ref={catalogoRef} className="relative w-full flex items-center justify-center">
                            <button onClick={()=> setOpenCatalogo(!openCatalogo)} className="flex w-full justify-center items-center gap-0.5 hover:text-[#B86112]">
                                CATALOGO
                                <span className={`transition-transform ${openCatalogo ? "rotate-180" : ""}`}>
                                    <ChevronUp />
                                </span>
                            </button>

                            {openCatalogo && (
                                <ul className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50 text-sm">
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
                                    <ChevronUp />
                                </span>
                            </button>

                            {openInfo && (
                                <ul className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50 text-sm">
                                    <Link href="/Quienes-Somos" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenInfo(false)}>¿QUIENES SOMOS?</Link>
                                    <Link href="/Aviso-De-Privacidad" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenInfo(false)}>AVISO DE PRIVACIDAD</Link>
                                    <Link href="/Politica-De-Garantia" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenInfo(false)}>POLÍTICA DE GARANTÍA</Link>
                                    <Link href="/Servicio-Al-Cliente" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenInfo(false)}>SERVICIO AL CLIENTE</Link>
                                </ul>
                            )}
                        </li>
                        <Link href={'/Contacto'} className="cursor-pointer hover:text-[#B86112]">CONTACTO</Link>
                    </ul>
                    <h4 className="text-black text-lg">Una web de <span className="font-semibold cursor-pointer"><a target="_blank" href="https://bycesaroliva.com/">César Oliva</a></span></h4>
                </div>
            </div>
        </footer>
    );
}
 
export default Footer;