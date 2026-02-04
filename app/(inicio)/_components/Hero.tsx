import Link from "next/link";

const Hero = () => {
    return (
        <section className="flex items-center justify-center mt-8 mb-16 md:mb-0">
            <div className="w-[90%] flex flex-col md:flex-row md:min-h-[80vh] items-center justify-center max-w-300">
                <div className="order-1 md:order-0 w-full md:w-1/2 text-center md:text-start">
                    <h2 className="text-lg font-semibold mb-1 mt-6 md:m-0">Dominoes | Tu mesa de juegos</h2>
                    <h3 className="text-4xl font-semibold mb-6 md:mb-8 md:max-w-xl">La mesa que hará legendarias tus noches con amigos.</h3>
                    <Link href={'/Catalogo'} className="font-semibold text-white px-8 py-4 bg-[#B86112] hover:bg-[#cb7818]">CATALOGO</Link>
                </div>
                <div className="order-0 md:order-1 w-full md:w-1/2 flex justify-center">
                    <img 
                        className="rounded-full size-96 md:size-120 object-cover"
                        src="/Mesa-Domino-Lux.jpg" 
                        alt="Mesa Dominó Lux | Dominoes"
                    />
                </div>
            </div>
        </section>
    );
}
 
export default Hero;