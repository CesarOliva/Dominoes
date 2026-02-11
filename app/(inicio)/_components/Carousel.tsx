"use client";

import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel"
import Link from "next/link";

const CarouselComponent = () => {
    return (
        <Carousel
            plugins={[
                Autoplay({
                    delay: 3000,
                }),
            ]}
            className="w-full">
            
            <CarouselContent className="ml-0 my-16 md:mb-0">
                <CarouselItem className="basis-full flex justify-center">
                    <div className="w-[90%] flex flex-col md:flex-row md:min-h-[80vh] items-center justify-center max-w-300">
                        <div className="order-1 md:order-0 w-full md:w-1/2 text-center md:text-start pr-0 md:pr-8">
                            <h2 className="text-lg font-semibold mb-1 mt-6 md:mt-0 md:mb-4 text-[#B86112]">PRODUCTO DESTACADO</h2>
                            <h3 className="text-5xl font-semibold mb-4">Mesa de Dominó Grand.</h3>
                            <p className="text-lg text-neutral-700 font-medium mb-8">Área de juego a nivel, personalizada (opcional colocar diseño de ajedrez o Backgammon).</p>
                            <div className="flex justify-center md:justify-start gap-4 md:gap-8">
                                <Link href='/Catalogo/mesa-domino-grand' className="font-semibold text-white px-8 py-4 bg-black hover:bg-[#1e1e1e]">COMPRA AHORA</Link>
                                <Link href='/Catalogo/mesa-domino-grand' className="font-semibold text-white px-8 py-4 bg-[#B86112] hover:bg-[#cb7818] flex items-center">DETALLES</Link>
                            </div>
                        </div>
                        <div className="order-0 md:order-1 w-full md:w-1/2 flex justify-center">
                            <img className="object-cover" 
                                src="/Mesa-Domino-Grand.jpg" 
                                alt="Mesa de Dominó Grand | Dominoes"
                            />
                        </div>
                    </div>
                </CarouselItem>
                <CarouselItem className="basis-full flex justify-center">
                    <div className="w-[90%] flex flex-col md:flex-row md:min-h-[80vh] items-center justify-center max-w-300">
                        <div className="order-1 md:order-0 w-full md:w-1/2 text-center md:text-start pr-0 md:pr-8">
                            <h2 className="text-lg font-semibold mb-1 mt-6 md:mt-0 md:mb-4 text-[#B86112]">PRODUCTO DESTACADO</h2>
                            <h3 className="text-5xl font-semibold mb-4">Mesa Blackjack Lux.</h3>
                            <p className="text-lg text-neutral-700 font-medium mb-8">Área de juego personalizada, paño sublimado, color de fondo a elección.</p>
                            <div className="flex justify-center md:justify-start gap-4 md:gap-8">
                                <Link href='/Catalogo/mesa-texas-holdem-lux' className="font-semibold text-white px-8 py-4 bg-black hover:bg-[#1e1e1e]">COMPRA AHORA</Link>
                                <Link href='/Catalogo/mesa-texas-holdem-lux' className="font-semibold text-white px-8 py-4 bg-[#B86112] hover:bg-[#cb7818] flex items-center">DETALLES</Link>
                            </div>
                        </div>
                        <div className="order-0 md:order-1 w-full md:w-1/2 flex justify-center">
                            <img className="object-cover" 
                                src="/Mesa-Blackjack-Lux.jpg" 
                                alt="Mesa Blackjack Lux | Dominoes"
                            />
                        </div>
                    </div>
                </CarouselItem>
                <CarouselItem className="basis-full flex justify-center">
                    <div className="w-[90%] flex flex-col md:flex-row md:min-h-[80vh] items-center justify-center max-w-300">
                        <div className="order-1 md:order-0 w-full md:w-1/2 text-center md:text-start pr-0 md:pr-8">
                            <h2 className="text-lg font-semibold mb-1 mt-6 md:mt-0 md:mb-4 text-[#B86112]">PRODUCTO DESTACADO</h2>
                            <h3 className="text-5xl font-semibold mb-4">Mesa Multijuegos Lux.</h3>
                            <p className="text-lg text-neutral-700 font-medium mb-8">Ruleta de 16” ABS eje de plástico. Área de juego es reversible, ofreciendo dos opciones en una sola mesa: </p>
                            <div className="flex justify-center md:justify-start gap-4 md:gap-8">
                                <Link href='/Catalogo/mesa-texas-holdem-lux' className="font-semibold text-white px-8 py-4 bg-black hover:bg-[#1e1e1e]">COMPRA AHORA</Link>
                                <Link href='/Catalogo/mesa-texas-holdem-lux' className="font-semibold text-white px-8 py-4 bg-[#B86112] hover:bg-[#cb7818] flex items-center">DETALLES</Link>
                            </div>
                        </div>
                        <div className="order-0 md:order-1 w-full md:w-1/2 flex justify-center">
                            <img className="object-cover" 
                                src="/Mesa-Multijuegos-Lux.jpg" 
                                alt="Mesa Multijuegos Lux | Dominoes"
                            />
                        </div>
                    </div>
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    )
}

export default CarouselComponent;