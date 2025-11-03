import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { MainCorousalData } from "./MainCarousalData";

const MainCarousel = () => {
  const items = MainCorousalData.map((item) => (
    <img
      src={item.link}
      className="cursor-pointer w-full h-[500px] object-cover object-top"
      alt="banner"
      role="presentation"
    />
  ));
  return (
    <AliceCarousel
      items={items}
      disableButtonsControls
      autoPlay
      autoPlayInterval={1000}
      infinite
    />
  );
};

export default MainCarousel;
