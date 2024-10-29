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
    <div className="w-full h-screen flex justify-center">
      <section className="w-full h-screen snap-start overflow-y-auto flex flex-col items-center justify-center px-8 xl:w-[50%]">
        {/* Responsive container for image and details sections */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Carousel */}
          <div className="flex flex-col items-center">
            <div className="relative w-full aspect-square">
              <img
                src={images[currentImage]}
                alt="Product"
                className="object-cover w-auto h-full"
              />
            </div>
            <div className="flex items-center justify-between w-full mt-4">
              <FaChevronLeft
                onClick={goToPreviousImage}
                className="cursor-pointer text-white text-xl"
              />
              <div className="flex space-x-4">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 ${
                      currentImage === index ? "bg-highlight" : "bg-white"
                    }`}
                  />
                ))}
              </div>
              <FaChevronRight
                onClick={goToNextImage}
                className="cursor-pointer text-white text-xl"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col items-start md:justify-between space-y-8">
            <div>
              <h3 className="text-title font-semibold md:text-titlemd xl:text-titlexl">
                SI V1
              </h3>
              <p className="text-bodyHighlight md:text-bodyHighlightmd xl:text-bodyHighlightxl">
                $150
              </p>
              <p className="text-body text-white hidden md:block">
                Detailed product description goes here. It will provide
                information about the product features and benefits. Detailed
                product description goes here. It will provide information about
                the product features and benefits.
              </p>
            </div>

            {/* Size Selector */}
            <div className="flex flex-col w-full">
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
          </div>
        </div>

        {/* Description and Tech Specs Section - Below the main grid */}
        <div className="w-full pt-8">
          <details className="w-full md:hidden">
            <summary className="cursor-pointer text-bodyHighlight font-semibold">
              DESCRIPTION
            </summary>
            <div className="mt-2">
              <p className="text-body text-white">
                Detailed product description goes here. It will provide
                information about the product features and benefits.
              </p>
            </div>
          </details>

          <details className="w-full mt-4">
            <summary className="cursor-pointer text-bodyHighlight font-semibold">
              TECH SPECS
            </summary>
            <div className="mt-2">
              <p className="text-body text-white">
                Technical specifications of the product are listed here. This
                section includes dimensions, materials, etc.
              </p>
            </div>
          </details>
          <details className="w-full mt-4">
            <summary className="cursor-pointer text-bodyHighlight font-semibold">
              SHIPPING & RETURNS
            </summary>
            <div className="mt-2">
              <p className="text-body text-white">
                Technical specifications of the product are listed here. This
                section includes dimensions, materials, etc.
              </p>
            </div>
          </details>
          <details className="w-full mt-4">
            <summary className="cursor-pointer text-bodyHighlight font-semibold">
              WARRANTY
            </summary>
            <div className="mt-2">
              <p className="text-body text-white">
                Technical specifications of the product are listed here. This
                section includes dimensions, materials, etc.
              </p>
            </div>
          </details>
        </div>
      </section>
    </div>
  );
};

export default Purchase;
