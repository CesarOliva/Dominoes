"use client";

import { CartContext, CartItem, cartReducer } from "@/context/CartContext";
import { useContext, useEffect, useReducer } from "react";


export function CartProvider({children}: { children: React.ReactNode}) {

    function getInitialCart() {
      if (typeof window === "undefined") return { items: [] }
    
      const stored = localStorage.getItem("cart")
      return stored ? { items: JSON.parse(stored) } : { items: [] }
    }
    
    const [state, dispatch] = useReducer(cartReducer, {}, getInitialCart)

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(state.items))
    }, [state.items])

    return (
        <CartContext.Provider value={{state, dispatch}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)