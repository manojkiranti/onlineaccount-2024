import { PublicHeader } from "@/components/Layout";
import QuickLinks from "../components/QuickLinks";
import Banner from "../components/Banner";
import ProductsList from "../components/ProductsList";


const Home = () => {

  return (
    <div className="home">
      <div>
        <div style={{ backgroundColor: "#f6f7fa" }}>
          <PublicHeader />
          <Banner />
        </div>
    
        <ProductsList />
      </div>
      <QuickLinks />
    </div>
  );
};

export default Home;
