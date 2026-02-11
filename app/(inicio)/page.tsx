import CarouselComponent from "./_components/Carousel";
import Hero from "./_components/Hero";
import Destacado from "./_components/Destacado";
import Beneficios from "./_components/Beneficios";
import Productos from "./_components/Productos";

const HomePage = () => {
  return (
    <>
      <CarouselComponent/>
      {/* <Hero/>
      <Destacado/> */}
      <Beneficios/>
      <Productos/>
    </>
  );
}
 
export default HomePage;