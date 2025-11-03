import React from "react";
import MainCarousel from "../../HomeCarousel/MainCarousel";
import HomeSectionCarousal from "../../HomeSectionCarousal/HomeSectionCarousal";

const HomePage = () => {
  return (
    <div>
      <MainCarousel />
      <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
        <HomeSectionCarousal />
        <HomeSectionCarousal />
        <HomeSectionCarousal />
        <HomeSectionCarousal />
        <HomeSectionCarousal />
      </div>
    </div>
  );
};

export default HomePage;
