import CarouselComponent from "./_components/Carousel";
import Hero from "./_components/Hero";
import Beneficios from "./_components/Beneficios";
import Productos from "./_components/Productos";

const HomePage = () => {
  return (
    <>
      <CarouselComponent/>
      <Hero/>
      <Beneficios/>
      <Productos/>
    </>
  );
}
 
export default HomePage;