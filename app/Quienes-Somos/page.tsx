const QuienesSomosPage = () => {
    return (
        <section className="flex items-center justify-center my-16">
            <div className="w-[90%] flex flex-col items-center justify-center max-w-300">
                <div className="flex flex-col md:flex-row items-center mb-8 md:mb-24">
                    <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                        <img src="/Mesa-Domino-Essential.jpg" alt="Quienes somos | Dominoes" className="rounded-xl shadow-lg w-full object-cover h-[300px] md:h-[400px]"/>
                    </div>
                    <div className="md:w-1/2 text-lg">
                        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center md:text-start">¿Quienes somos?</h2>
                        <p className="text-lg text-start text-neutral-700 font-medium">
                            En <b>Dominoes</b> no solo fabricamos muebles; creamos el escenario donde nacen tus mejores momentos. Somos especialistas en el diseño y fabricación de mesas de juego personalizadas a medida, concebidas para elevar cada partida a una experiencia superior.
                            <br/><br/>Creemos que cada jugador es único. Por eso, nuestro proceso inicia con tu idea: Transformamos tu idea en piezas exclusivas que fusionan funcionalidad, diseño y calidad artesanal cuidando cada detalle con precisión y pasión.
                        </p>
                    </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 text-lg mb-8 md:mb-0">
                        <p className="text-lg text-start text-neutral-700 font-medium">
                            Más allá del juego: <b>Dominoes</b> es también amor por la madera y el diseño que trasciende el entretenimiento.
                            <br/><br/>A través de nuestra línea Home, desarrollamos muebles personalizados para el hogar, creados a medida para integrarse perfectamente a tu espacio y estilo de vida. Desde áreas sociales hasta rincones personales, llevamos la personalización total a cada lugar de tu casa.
                            <br/><br/><b>Dominoes</b> es diseño, carácter y experiencia. 
                            <br/>Hecho a tu medida. Hecho para disfrutarse
                        </p>
                    </div>
                    <div className="md:w-1/2 md:pl-10">
                        <img src="/Repisa-Flotante.jpg" alt="Quienes somos | Dominoes" className="rounded-xl shadow-lg"/>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default QuienesSomosPage;