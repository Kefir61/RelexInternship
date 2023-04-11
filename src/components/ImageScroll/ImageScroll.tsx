import React, { FC, useState } from "react";
import productDefault from "../../assets/images/productPlaceholder.png";
import "./ImageScrollStyle.scss";

interface IImageScrollProps {
  images: string[];
}

export const ImageScroll: FC<IImageScrollProps> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [leftOver, setLeftOver] = useState(true);
  const [rightOver, setRightOver] = useState(currentImage === images.length - 1);

  const handleChangeImage = (side: "left" | "right") => {
    if (side === "right" && currentImage + 1 <= images.length - 1) {
      setCurrentImage((prev) => prev + 1);
      setRightOver(currentImage + 1 === images.length - 1);
      setLeftOver(false);
    } else if (side === "left" && currentImage - 1 >= 0) {
      setCurrentImage((prev) => prev - 1);
      setLeftOver(currentImage - 1 === 0);
      setRightOver(false);
    }
  };

  return (
    <div className="fotoScroller">
      <button
        onClick={() => handleChangeImage("left")}
        disabled={leftOver}
        className="switchButton"
      >
        {"<"}
      </button>
      <img src={images[currentImage] || productDefault} className="foto" alt="" />
      <button
        onClick={() => handleChangeImage("right")}
        disabled={rightOver}
        className="switchButton"
      >
        {">"}
      </button>
    </div>
  );
};
