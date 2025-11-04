import { mens_kurta } from "../../../../data/Men/men_kurta";
import MainCarousel from "../../HomeCarousel/MainCarousel";
import HomeSectionCarousal from "../../HomeSectionCarousal/HomeSectionCarousal";

const HomePage = () => {
  return (
    <div>
      <MainCarousel />
      <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
        <HomeSectionCarousal data={mens_kurta} sectionName="Men's Kurta" />
        <HomeSectionCarousal data={mens_kurta} sectionName="Men's Shoes" />
        <HomeSectionCarousal data={mens_kurta} sectionName="Men's Short" />
        <HomeSectionCarousal data={mens_kurta} sectionName="Women's Saree" />
        <HomeSectionCarousal data={mens_kurta} sectionName="Women's Dress" />
      </div>
    </div>
  );
};

export default HomePage;
