import Link from "next/link";

const Hero = () => {
    return (
        <>
            <section className="flex items-center justify-center mt-8 mb-16 md:mb-0">
                <div className="w-[90%] flex flex-col md:flex-row md:min-h-[80vh] gap-x-8 items-center justify-center max-w-300">
                    <div className="flex flex-col mb-16 md:mb-0">
                        <div className="w-full flex justify-center mb-4">
                            <img 
                                className="rounded-full size-80 md:size-96 object-cover"
                                src="/Mesa-Domino-Lux.jpg" 
                                alt="Mesa Dominó Lux | Dominoes"
                            />
                        </div>
                        <div className="w-full text-center">
                            <h2 className="text-lg font-semibold mb-1 mt-6 md:m-0">Dominoes | Tu mesa de juegos</h2>
                            <h3 className="text-3xl font-semibold mb-6 md:mb-8 md:max-w-lg">La mesa que hará legendarias tus noches con amigos.</h3>
                            <Link href={'/Catalogo'} className="font-semibold text-white px-8 py-4 bg-[#B86112] hover:bg-[#cb7818]">CATALOGO</Link>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="w-full flex justify-center mb-4">
                            <img 
                                className="rounded-full size-80 md:size-96 object-cover"
                                src="/Repisa-Flotante.jpg" 
                                alt="Mesa Dominó Lux | Dominoes"
                            />
                        </div>
                        <div className="w-full text-center">
                            <h2 className="text-lg font-semibold mb-1 mt-6 md:m-0">Dominoes | Productos del hogar</h2>
                            <h3 className="text-3xl font-semibold mb-6 md:mb-8 md:max-w-lg">Nuestra selección de productos del hogar.</h3>
                            <Link href={'/Catalogo'} className="font-semibold text-white px-8 py-4 bg-[#B86112] hover:bg-[#cb7818]">CATALOGO</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
 
export default Hero;