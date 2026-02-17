"use client"

import { useEffect, useState } from "react"
import { useQuery } from "convex/react"
import { useRouter } from "next/navigation"
import { useSearch } from "@/hooks/use-search"
import { api } from "@/convex/_generated/api"

import { 
    CommandDialog, 
    CommandEmpty, 
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command"

const SearchCommand = () => {
    const router = useRouter();
    const products = useQuery(api.products.getAllProducts);

    const [isMounted, setIsMounted] = useState(false);

    const toggle = useSearch((store)=> store.toggle);
    const isOpen = useSearch((store)=> store.isOpen);
    const onClose = useSearch((store)=> store.onClose);


    useEffect(()=>{
        setIsMounted(true)
    }, [])

    useEffect(()=>{
        const down = (e: KeyboardEvent) => {
            if(e.key === "k" && e.ctrlKey){
                e.preventDefault();
                toggle();
            }
        }

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [toggle])

    const onSelect = (url: string)=>{
        router.push(`/Productos/${url}`);
        onClose();
    }

    if(!isMounted) return null

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput placeholder='Buscar producto...'/>
            <CommandList>
                <CommandEmpty>Not results found</CommandEmpty>
                <CommandGroup heading="Productos">
                    {products?.map((product) => (
                        <CommandItem 
                            key={product._id} 
                            value={`${product.url}`}
                            title={product.name}
                            onSelect={onSelect}
                        >
                            <img src={product.images[0]} alt={product.name} className="size-16 rounded-md"/>
                            <span>{product.name}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}
 
export default SearchCommand;