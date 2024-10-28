// src/components/Purchase.tsx

import React, { useState } from "react";
import Infographicinsole from "../assets/images/infographicinsole.png";
import PurchaseButton from "./PurchaseButton";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Purchase: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [currentImage, setCurrentImage] = useState(0);
  const images = [Infographicinsole, Infographicinsole, Infographicinsole]; // Example images array

  // Carousel Navigation
  const goToPreviousImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full h-screen md:h-auto overflow-y-scroll py-8 pt-20 flex flex-col md:flex-row items-center justify-start snap-start">
      {/* Image Carousel */}
      <div className="flex flex-col w-full h-auto px-8 items-center md:w-1/2">
        <div className="relative w-full  aspect-square">
          {/* Limit width and set square aspect ratio */}
          <img
            src={images[currentImage]}
            alt="Product"
            className="object-cover w-auto h-full "
          />
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-between w-full mt-4">
          <FaChevronLeft
            onClick={goToPreviousImage}
            className="-translate-x-1/4 cursor-pointer text-white text-xl"
          />
          <div className="flex space-x-1">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2  ${
                  currentImage === index ? "bg-highlight" : "bg-white"
                }`}
              />
            ))}
          </div>
          <FaChevronRight
            onClick={goToNextImage}
            className=" cursor-pointer text-white text-xl"
          />
        </div>
      </div>

      {/* Details Section */}
      <div className="flex flex-col items-start space-y-4 w-full pt-8 px-8 md:w-1/2 md:pl-8 ">
        <h3 className="text-title font-semibold md:text-titlemd xl:text-titlexl">
          SI V1
        </h3>
        <p className="text-bodyHighlight md:text-bodyHighlightmd xl:text-bodyHighlightxl">
          $150
        </p>

        {/* Size Selector */}
        <div className="flex flex-col space-y-2 w-full ">
          <span className="text-bodyHighlight">Size:</span>
          <div className="flex w-full justify-between text-h2 font-medium">
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <span
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`cursor-pointer w-12 h-12 flex items-center justify-center ${
                  selectedSize === size ? "border border-white" : ""
                }`}
              >
                {size}
              </span>
            ))}
          </div>
          <p className="underline text-body">Fit / Size Guide</p>
          <div className="w-full flex items-center justify-center pt-4">
            <PurchaseButton selectedSize={selectedSize} />
          </div>
        </div>

        {/* Toggles for Description and Tech Specs */}
        <details className="w-full pt-8">
          <summary className="cursor-pointer text-bodyHighlight font-semibold">
            DESCRIPTION
          </summary>
          <p className="text-body white mt-2">
            Detailed product description goes here. It will provide information
            about the product features and benefits.
          </p>
        </details>

        <details className="w-full mt-4">
          <summary className="cursor-pointer text-bodyHighlight font-semibold">
            TECH SPECS
          </summary>
          <p className="text-body white mt-2">
            Technical specifications of the product are listed here. This
            section includes dimensions, materials, etc.
          </p>
        </details>
      </div>
    </section>
  );
};

export default Purchase;
