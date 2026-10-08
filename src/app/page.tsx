import AllProducts from "./components/AllProducts";
import Banner from "./components/Banner";
import FallingProducts from "./components/FallingProducts";
import RisingProducts from "./components/RisingProducts";


export default function Home() {
  return (
    <div className="bg-base-200">
      <Banner/>
      <RisingProducts/>
      <FallingProducts/>
      <AllProducts/>
    </div>
  );
}
