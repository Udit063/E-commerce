import { KeyboardArrowLeft } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";

const HomeSectionCarousal = ({data, sectionName}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5.5 },
  };

  const [mainRef, setMainRef] = useState(null);

  const slidePrev = () => {
    if (mainRef) mainRef.slidePrev();
  };

  const slideNext = () => {
    if (mainRef) mainRef.slideNext();
  };

  const items = data
    .slice(0, 10)
    .map((item) => <HomeSectionCard product={item} key={item.id} />);

  return (
    <div className="border border-black">
      <h2 className="text-2xl font-extrabold text-gray-800 py-5">{sectionName}</h2>
      <div className="relative p-5">
        <AliceCarousel
          ref={(el) => setMainRef(el)}
          items={items}
          disableButtonsControls
          responsive={responsive}
          disableDotsControls
          onSlideChanged={(e) => setActiveIndex(e.item)}
          activeIndex={activeIndex}
        />
        {activeIndex !== 0 && (
          <Button
            variant="contained"
            sx={{
              position: "absolute",
              top: "8rem",
              left: "0rem",
              transform: "translateX(-50%) rotate(90deg)",
              backgroundColor: "white",
              color: "black",
            }}
            aria-label="prev"
            className="z-50 bg-white text-black"
            onClick={slidePrev}
          >
            <KeyboardArrowLeft sx={{ transform: "rotate(-90deg)" }} />
          </Button>
        )}

        {activeIndex < items.length - 5 && (
          <Button
            variant="contained"
            sx={{
              position: "absolute",
              top: "8rem",
              right: "0rem",
              transform: "translateX(50%) rotate(90deg)",
              backgroundColor: "white",
              color: "black",
            }}
            aria-label="next"
            className="z-50 bg-white text-black"
            onClick={slideNext}
          >
            <KeyboardArrowLeft sx={{ transform: "rotate(90deg)" }} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCarousal;
