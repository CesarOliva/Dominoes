"use client";

import { ChevronDown, Search, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from 'next/link';
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCatalogFilters } from "@/utils/catalogFilters";
import { useSearch } from "@/hooks/use-search";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import Cart from "./Cart";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openMesas, setOpenMesas] = useState(false);
    const [openHogar, setOpenHogar] = useState(false);
    const mesasRef = useRef<HTMLLIElement>(null)
    const hogarRef = useRef<HTMLLIElement>(null)

    const search = useSearch()
    
    const productsMesas = useQuery(api.products.getCategoriesByParent, {name: "Mesas de juego"});
    const productsHogar = useQuery(api.products.getCategoriesByParent, {name: "Productos del hogar"});

    const { isAuthenticated, isLoading } = useConvexAuth();

    const { reset } = useCatalogFilters()

    const setCategories = useCatalogFilters(
        state => state.setCategories
    )

    const handleSelectCategory = (id: Id<"categories">[]) =>{
        setOpenMesas(false);
        setOpenHogar(false);
        setCategories(id)
    }

    useEffect(()=>{
        const handleClickOutside = (e:MouseEvent) => {
            if(!mesasRef.current?.contains(e.target as Node) &&
                !hogarRef.current?.contains(e.target as Node)){
                setOpenMesas(false);
                setOpenHogar(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [])

    return (
        <header className="p-4 sticky top-0 left-0 right-0 bg-white shadow-md z-25">
            <nav className="flex w-full items-center justify-around">
                <div className="flex items-center">
                    <Link href={'/'}>
                        <img className="h-14" src="/logo.jpg" alt="Logo Dominoes"/>
                    </Link>
                </div>

                <ul className="max-w-md md:max-w-2xl flex-wrap justify-center hidden sm:flex font-semibold gap-x-4 md:gap-x-6 text-md md:text-lg items-center">
                    <Link href={'/'} className="cursor-pointer hover:text-[#B86112]">INICIO</Link>
                    <li ref={mesasRef} className="relative">
                        <button onClick={()=> setOpenMesas(!openMesas)} className="flex items-center gap-0.5 hover:text-[#B86112]">
                            MESAS
                            <span className={`transition-transform ${openMesas ? "rotate-180" : ""}`}>
                                <ChevronDown />
                            </span>
                        </button>

                        {openMesas && (
                            <ul className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-60 text-sm">
                                <Link href="/Mesas-De-Juego" className="block px-4 py-2 hover:bg-gray-100" onClick={() => {
                                    setOpenMesas(false);
                                    reset();
                                }}>VER TODO</Link>
                                {productsMesas?.map(cat => (
                                    <Link key={cat._id} href="/Mesas-De-Juego" className="block px-4 py-2 hover:bg-gray-100" onClick={() => handleSelectCategory([cat._id])}>{cat.categoryName.toUpperCase()}</Link>
                                ))}
                            </ul>
                        )}
                    </li>
                    <li ref={hogarRef} className="relative">
                        <button onClick={()=> setOpenHogar(!openHogar)} className="flex items-center gap-0.5 hover:text-[#B86112]">
                            HOGAR
                            <span className={`transition-transform ${openHogar ? "rotate-180" : ""}`}>
                                <ChevronDown />
                            </span>
                        </button>

                        {openHogar && (
                            <ul className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50 text-sm">
                                <Link href="/Productos-Del-Hogar" className="block px-4 py-2 hover:bg-gray-100" onClick={() => {
                                    setOpenMesas(false);
                                    reset();
                                }}>VER TODO</Link>
                                {productsHogar?.map(cat => (
                                    <Link key={cat._id} href="/Productos-Del-Hogar" className="block px-4 py-2 hover:bg-gray-100" onClick={() => handleSelectCategory([cat._id])}>{cat.categoryName.toUpperCase()}</Link>
                                ))}
                            </ul>
                        )}
                    </li>
                    <Link href={'/Galeria'} className="cursor-pointer hover:text-[#B86112]">GALERÍA</Link>
                    <Link href={'/Contacto'} className="cursor-pointer hover:text-[#B86112]">CONTACTO</Link>
                </ul>
                
                <div className="flex gap-4 md:gap-6 items-center">
                    <Search className="size-6" onClick={search.onOpen}/>
                    <Cart/>
                    {isLoading && (
                        <p>...</p>
                    )}
                    {!isAuthenticated && !isLoading && (
                        <SignInButton>
                            <User className="size-6 cursor-pointer"/>
                        </SignInButton>
                    )}
                    {isAuthenticated && !isLoading && (
                        <UserButton afterSignOutUrl="/"/>
                    )}
                    <img onClick={()=> setIsOpen(!isOpen)} className="block sm:hidden size-6" src="/puntos.png" alt="Ilustrativo"/>
                </div>
            </nav>

            {isOpen && (
                <div className="sm:hidden mt-2">
                    <ul className="flex flex-col gap-y-3 font-semibold text-md py-2 text-center">
                        <Link href={'/'} onClick={()=>setIsOpen(false)} className="cursor-pointer hover:text-[#B86112]">INICIO</Link>
                        <li ref={mesasRef} className="relative w-full flex items-center justify-center">
                            <button onClick={()=> setOpenMesas(!openMesas)} className="flex w-full justify-center items-center gap-0.5 hover:text-[#B86112]">
                                MESAS
                                <span className={`transition-transform ${openMesas ? "rotate-180" : ""}`}>
                                    <ChevronDown />
                                </span>
                            </button>

                            {openMesas && (
                                <ul className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-60 text-sm">
                                    <Link href="/Mesas-De-Juego" className="block px-4 py-2 hover:bg-gray-100" onClick={() => {
                                        setOpenMesas(false)
                                        setIsOpen(false)
                                        reset()
                                    }}>VER TODO</Link>
                                    {productsMesas?.map(cat => (
                                        <Link key={cat._id} href="/Mesas-De-Juego" className="block px-4 py-2 hover:bg-gray-100" onClick={() => {
                                            handleSelectCategory([cat._id])
                                            setIsOpen(false)
                                        }}>{cat.categoryName.toUpperCase()}</Link>
                                    ))}
                                </ul>
                            )}
                        </li>
                        <li ref={hogarRef} className="relative w-full flex items-center justify-center">
                            <button onClick={()=> setOpenHogar(!openHogar)} className="flex w-full justify-center items-center gap-0.5 hover:text-[#B86112]">
                                HOGAR
                                <span className={`transition-transform ${openHogar ? "rotate-180" : ""}`}>
                                    <ChevronDown />
                                </span>
                            </button>

                            {openHogar && (
                                <ul className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50 text-sm">
                                    <Link href="/Productos-Del-Hogar" className="block px-4 py-2 hover:bg-gray-100" onClick={() => {
                                        setOpenMesas(false)
                                        setIsOpen(false)
                                        reset()
                                    }}>VER TODO</Link>
                                    {productsHogar?.map(cat => (
                                        <Link key={cat._id} href="/Productos-Del-Hogar" className="block px-4 py-2 hover:bg-gray-100" onClick={() => {
                                            handleSelectCategory([cat._id])
                                            setIsOpen(false)
                                        }}>{cat.categoryName.toUpperCase()}</Link>
                                    ))}
                                </ul>
                            )}
                        </li>
                        <Link href={'/Galeria'} onClick={()=>setIsOpen(false)} className="cursor-pointer hover:text-[#B86112]">GALERÍA</Link>
                        <Link href={'/Contacto'} onClick={()=>setIsOpen(false)} className="cursor-pointer hover:text-[#B86112]">CONTACTO</Link>
                    </ul>
                </div>
            )}
        </header>
    );
}
 
export default Navbar;