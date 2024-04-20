// import ListProductScreen from "./listProducts/ListProductScreen";
import HeroCarousel from "./heroCarousel/HeroCarousel";
import ServicesScreen from "./services/ServicesScreen";
import ProductsCarousel from "./productsCarousel/ProductsCarousel";
import WhoWeAre from "./whoWeAre/WhoWeAre";
import TeamScreen from "./team/TeamScreen";
import BlogHomeScreen from "./blog/BlogHomeScreen";
import ContactScreen from "./contact/ContactScreen";
import Gallery from "./gallery/Gallery";
import CountsSection from "./countsSection/CountsSection";
import CourseScreen from "./courses/CourseScreen";
import AboutScreen from "./about/AboutScreen";
import FaqsScreen from "./faqs/FaqsScreen";
import OpenAdmissionBatch from "./admission/OpenAdmissionBatch";

const HomeScreen = () => {
  return (
    <>
      <HeroCarousel />
      <OpenAdmissionBatch/>
      <CourseScreen/>
      <ProductsCarousel />
      <BlogHomeScreen />
      <Gallery />
      <AboutScreen/>
      <CountsSection/>
      <TeamScreen />
      <ServicesScreen />
      <FaqsScreen/>
      <ContactScreen />
    </>
  );
};

export default HomeScreen;
