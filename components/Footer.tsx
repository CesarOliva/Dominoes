import Link from "next/link";

const Footer = () => {
    return (
        <footer className="flex items-center justify-center pt-8 bg-white">
            <div className="w-[90%] flex flex-col items-center justify-center max-w-300">
                <Link href={'/'}>
                    <img src="/logo.jpg" alt="Logo Dominoes" className="h-16 mb-4"/>
                </Link>
                <p className="text-black font-normal text-lg mb-8">Tu mesa de juegos</p>
                <div className="flex flex-col md:flex-row gap-8 mb-8 md:mb-12">
                    <div className="flex flex-col items-center">
                        <div className="flex gap-8 mb-2">
                            <a target="_blank" href="https://www.facebook.com/mesasdejuegopersonalizadas">
                                <img className='size-10' src="/facebook.svg" alt="Facebook Dominoes"/>
                            </a>
                            <a target="_blank" href="https://www.instagram.com/mesasdejuegopersonalizadas/">
                                <img className='size-10' src="/instagram.svg" alt="Instagram Dominoes"/>
                            </a>
                        </div>
                        <h4 className="text-xl font-semibold">Mesas</h4>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex gap-8 mb-2">
                            <a target="_blank" href="https://www.facebook.com/dominoeshogar/">
                                <img className='size-10' src="/facebook.svg" alt="Facebook Dominoes"/>
                            </a>
                            <a target="_blank" href="https://www.instagram.com/dominoes.home/">
                                <img className='size-10' src="/instagram.svg" alt="Instagram Dominoes"/>
                            </a>
                        </div>
                        <h4 className="text-xl font-semibold">Home</h4>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 w-full items-center justify-between mb-12">
                    <span className="text-lg">® DOMINOES 2026</span>
                    <ul className="flex flex-col md:flex-row items-center font-medium gap-x-4 text-lg">
                        <Link href="/Quienes-Somos" className="block md:max-w-36 text-center px-4 py-2 hover:bg-gray-100">¿QUIENES SOMOS?</Link>
                        <Link href="/Aviso-De-Privacidad" className="block md:max-w-36 text-center px-4 py-2 hover:bg-gray-100">AVISO DE PRIVACIDAD</Link>
                        <Link href="/Politica-De-Garantia" className="block px-4 md:max-w-36 text-center py-2 hover:bg-gray-100">POLÍTICA DE GARANTÍA</Link>
                        <Link href="/Servicio-Al-Cliente" className="block px-4 md:max-w-36 text-center py-2 hover:bg-gray-100">SERVICIO AL CLIENTE</Link>
                    </ul>
                    <h4 className="text-black text-lg">Una web de <span className="font-semibold cursor-pointer"><a target="_blank" href="https://bycesaroliva.com/">César Oliva</a></span></h4>
                </div>
            </div>
        </footer>
    );
}
 
export default Footer;