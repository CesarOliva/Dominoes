"use client";

import { createContext, useContext, useEffect, useState }  from "react";
import { jwtDecode } from 'jwt-decode'
import { toast } from "sonner";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface User {
    email: string;
    name: string;
    picture: string;
    exp: number;
}

interface AuthContextType {
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}: {children: React.ReactNode}) {
    const admin = useQuery(api.products.getAdmin);

    const [user, setUser] = useState<User | null>(null);
    const [loading, setIsLoading] = useState(true);

    useEffect(()=> {
        const token = localStorage.getItem("google_token")
        if(token){
            setUser(jwtDecode(token))
        }
        setIsLoading(false);
    }, []);

    const login = (token: string) => {
        const decoded = jwtDecode<User>(token);

        if (decoded.email !== admin?.email) {
            toast.error("Acceso no autorizado");
            return;
        }

        localStorage.setItem("google_token", token);
        setUser(decoded);
        toast.success('Redirigiendo al admin panel')
    }

    const logout = () => {
        localStorage.removeItem("google_token");
        setUser(null)
        toast.success('Sesion cerrada')
    }

    return(
        <AuthContext.Provider value={{user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}