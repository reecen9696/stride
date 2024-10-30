import React, { useState } from "react";
import Infographicinsole from "../assets/images/infographicinsole.png";
import PurchaseButton from "./PurchaseButton";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Purchase1 from "../assets/images/purchase/purchase1.png";
import Purchase2 from "../assets/images/purchase/purchase2.png";
import Purchase3 from "../assets/images/purchase/purchase3.png";

const Purchase: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [currentImage, setCurrentImage] = useState(0);
  const images = [Purchase1, Purchase2, Purchase3];

  // Swap the logic for previous and next
  const goToPreviousImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToNextImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Swipe functionality
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    const distance = touchStart - touchEnd;
    const threshold = 50;

    if (distance > threshold) {
      goToNextImage();
    } else if (distance < -threshold) {
      goToPreviousImage();
    }
  };

  return (
    <div className="w-full h-full md:flex md:justify-center">
      <section className="w-full h-screen snap-start overflow-y-auto flex flex-col items-center sm:justify-start px-9 pt-32 xl:pt-48 xl:w-[50%]">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Swipeable Image Carousel with Sliding Effect */}
          <div
            className="relative w-full overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentImage * 100}%)`,
              }}
            >
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="object-cover w-full"
                />
              ))}
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
                information about the product features and benefits.
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

        {/* Description and Tech Specs Section */}
        <div className="w-full pt-8 pb-24">
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
                Technical specifications of the product are listed here.
              </p>
            </div>
          </details>
          <details className="w-full mt-4">
            <summary className="cursor-pointer text-bodyHighlight font-semibold">
              SHIPPING & RETURNS
            </summary>
            <div className="mt-2">
              <p className="text-body text-white">
                Information about shipping and returns.
              </p>
            </div>
          </details>
          <details className="w-full mt-4">
            <summary className="cursor-pointer text-bodyHighlight font-semibold">
              WARRANTY
            </summary>
            <div className="mt-2">
              <p className="text-body text-white">
                Details about the product warranty.
              </p>
            </div>
          </details>
        </div>
      </section>
    </div>
  );
};

export default Purchase;
