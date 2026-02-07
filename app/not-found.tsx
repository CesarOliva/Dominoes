"use client";

import Link from "next/link";

const Error = () => {
    return (
        <section className="flex items-center justify-center mt-8 mb-16">
            <div className="w-[90%] flex flex-col items-center justify-center max-w-300">
                <h1 className="text-center text-4xl font-bold mb-4">Página no encontrada</h1>
                <p className="text-center text-lg mb-8">La página que estás buscando no existe o ha sido movida.</p>
                <Link href={'/'} className="bg-[#B86112] hover:bg-[#cb7818] font-semibold text-white px-6 py-3 rounded-lg transition-colors duration-300">
                    Volver a la página principal
                </Link>
            </div>
        </section>
    );
}
 
export default Error;