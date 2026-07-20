import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import ProductPreview from "../components/landing/ProductPreview";
import Workflow from "../components/landing/Workflow";
import WhyChoose from "../components/landing/WhyChoose";


function Landing() {
  return (
    <div className="bg-[#070B1A] min-h-screen">
      <Navbar />
      <Hero />
      <ProductPreview />
      <Workflow />
      <WhyChoose />
    </div>
  );
}

export default Landing;