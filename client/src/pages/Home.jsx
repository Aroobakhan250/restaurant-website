import Hero from "../components/home/Hero";
import OfferBanner from "../components/home/OfferBanner";
import Categories from "../components/home/Categories";
import Specials from "../components/home/Specials";
import Chef from "../components/home/Chef";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Stats from "../components/home/Stats";
import Reviews from "../components/home/Reviews";
import Gallery from "../components/home/Gallery";
import Newsletter from "../components/home/Newsletter";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <OfferBanner />
      <Categories />
      <Specials />
      <Chef />
      <WhyChooseUs />
      <Stats />
      <Reviews />
      <Gallery />
      <Newsletter />
      <Footer />
    </main>
  );
}