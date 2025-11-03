import { KeyboardArrowLeft } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";

const HomeSectionCarousal = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5.5 },
  };

  const slidePrev = () => setActiveIndex(activeIndex - 1);
  const slideNext = () => setActiveIndex(activeIndex + 1);

  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const items = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item) => (
    <HomeSectionCard />
  ));
  return (
    <div className="border border-black">
      <div className="relative p-5">
        <AliceCarousel
          items={items}
          disableButtonsControls
          responsive={responsive}
          infinite
          disableDotsControls
          onSlideChange={syncActiveIndex}
          activeIndex={activeIndex}
        />
        {activeIndex !== items.length - 5 && (
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
            aria-label="prev"
            className="z-50 bg-white text-black"
            onClick={slidePrev}
          >
            <KeyboardArrowLeft sx={{ transform: "rotate(90deg)" }} />
          </Button>
        )}

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
          aria-label="next"
          className="z-50 bg-white text-black"
          onClick={slideNext}
        >
          <KeyboardArrowLeft sx={{ transform: "rotate(-90deg)" }} />
        </Button>
      </div>
    </div>
  );
};

export default HomeSectionCarousal;
