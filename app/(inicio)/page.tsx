import Beneficios from "./_components/Beneficios";
import Destacado from "./_components/Destacado";
import Hero from "./_components/Hero";
import Portada from "./_components/Portada";
import Productos from "./_components/Productos";

const HomePage = () => {
  return (
    <>
      {/* <Portada/> */}
      <Hero/>
      <Destacado/>
      <Beneficios/>
      <Productos/>
    </>
  );
}
 
export default HomePage;