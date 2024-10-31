// src/pages/Home.tsx

import React, { useState, useEffect, useRef } from "react";
import ShoeGif from "../assets/images/spinningshoe.gif";
import Infographic from "../assets/images/infographic.png";
import Chevron from "../assets/icons/chevron.svg";
import "../App.css";
import Purchase from "../components/Purchase";
import VideoFile from "../assets/videos/samplevideo.mp4";
import { useSwipeable } from "react-swipeable";

// Define prop type for setLogoColor
type HomeProps = {
  setLogoColor: React.Dispatch<React.SetStateAction<string>>;
};

const Home: React.FC<HomeProps> = ({ setLogoColor }) => {
  const skipLoading = false; // Set to `true` to skip loading pages, `false` to show them
  const [animationStep, setAnimationStep] = useState<number | null>(null);
  const [isFinalSectionVisible, setIsFinalSectionVisible] = useState(false);
  const [isSecondPageVisible, setIsSecondPageVisible] = useState(false);
  const finalSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (skipLoading) {
      setAnimationStep(6);
      setLogoColor("black");
    } else {
      setTimeout(() => {
        const sequence = [
          () => {
            setAnimationStep(1);
            setLogoColor("black"); // Initial color
          },
          () => setAnimationStep(2),
          () => {
            setAnimationStep(3);
            setLogoColor("white"); // Change logo color to white when background turns black
          },
          () => setAnimationStep(4),
          () => setAnimationStep(5),
          () => setAnimationStep(6),
        ];

        sequence.forEach((step, i) => {
          setTimeout(step, i * 800);
        });
      }, 1000);
    }
  }, [setLogoColor, skipLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFinalSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    const currentRef = finalSectionRef.current;

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  useEffect(() => {
    const secondPageRef = document.getElementById("second-page");

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSecondPageVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (secondPageRef) observer.observe(secondPageRef);

    return () => {
      if (secondPageRef) observer.unobserve(secondPageRef);
    };
  }, []);

  useEffect(() => {
    if (isSecondPageVisible) {
      setLogoColor("black"); // Change to black when on the second page
    } else {
      setLogoColor("white"); // Change back to white when not on the second page
    }
  }, [isSecondPageVisible, setLogoColor]);

  return (
    <div className="snap-y snap-mandatory h-screen overflow-hidden">
      {" "}
      {/* Ensures no overflow for snapping */}
      {/* Initial Animation Steps */}
      <div
        className={`${
          (animationStep ?? 0) < 6
            ? "fixed h-screen w-full flex items-center justify-center slow-bg-transition"
            : "hidden"
        } ${(animationStep ?? 0) >= 3 ? "bg-black" : "bg-white"}`}
      >
        <p
          className={`${
            animationStep === 1
              ? "fade-in"
              : animationStep === 2
              ? "fade-out"
              : "hidden"
          } text-black text-h3 md:text-h3md xl:text-h3xl`}
        >
          Every step tells a story
        </p>
        <p
          className={`${
            animationStep === 4
              ? "fade-in"
              : animationStep === 5
              ? "fade-out"
              : "hidden"
          } text-white text-h3 md:text-h3md xl:text-h3xl`}
        >
          Measure what moves you
        </p>
      </div>
      {/* Full Scroll Page Content with Fade-in Transition */}
      <div
        className={`${
          animationStep === 6 ? "fade-in" : "hidden"
        } snap-y snap-mandatory h-screen overflow-y-scroll`}
      >
        {/* Page 1 - Video */}
        <section className="w-full min-h-screen flex items-center justify-center snap-start relative">
          {/* Image for large and extra-large screens only */}
          <img
            src={ShoeGif}
            alt="Shoe"
            className="w-[80%] h-[80%] max-h-[80vh] object-contain hidden lg:block absolute inset-0 m-auto"
            style={{ top: "10%", left: "10%", right: "10%", bottom: "10%" }}
          />

          {/* Content positioned in bottom-left corner for large screens */}
          <div className="p-8 md:px-24 lg:px-16 xl:px-24 lg:w-1/2 xl:w-1/3 text-white z-10 relative lg:absolute lg:bottom-12 lg:left-8 hidden lg:block">
            <h3 className="text-title font-semibold md:text-titlemd xl:text-titlexl">
              SI V1
            </h3>
            <p className="text-bodyHighlight md:text-bodyHighlightmd xl:text-bodyHighlightxl">
              $120
            </p>
            <p className="text-body md:text-body lg:text-bodymd">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Content for small and medium screens */}
          <div className="p-8 md:px-24 lg:px-16 xl:px-24 lg:w-[50%] xl:w-[40%] space-y-2 block lg:hidden">
            <img
              src={ShoeGif}
              alt="Shoe"
              className="w-full max-w-lg object-contain max-h-[50vh] md:max-h-[70vh] lg:max-h-[40vh]"
            />
            <h3 className="text-title font-semibold md:text-titlemd xl:text-titlexl ">
              SI V1
            </h3>
            <p className="text-bodyHighlight md:text-bodyHighlightmd xl:text-bodyHighlightxl ">
              $120
            </p>
            <p className="text-body md:text-body lg:text-bodymd ">
              Stride smart insoles transforms every step, using high-tech
              sensors to measure pressure, balance, and movement.
            </p>
          </div>
        </section>

        {/* Page 2 - App Info with Video and Infographic */}
        <section
          id="second-page"
          className="w-full min-h-screen flex items-center justify-center snap-start relative bg-white"
        >
          {/* Video Background - Large screens */}
          <div className="absolute w-[11%] h-[30%] top-[30%] left-[44%] overflow-hidden hidden lg:block">
            <video
              className="w-full h-full object-contain max-w-full max-h-full"
              src={VideoFile}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          {/* Video Background - Small and Medium screens */}
          <div className="absolute w-[40%] h-[24%] top-[27.5%] inset-0 mx-auto overflow-hidden block lg:hidden">
            <video
              className="w-full h-full object-contain max-w-full max-h-full"
              src={VideoFile}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          {/* Infographic Image - Large screens */}
          <img
            src={Infographic}
            alt="Infographic with phone hole"
            className="w-[60%] h-[60%] max-h-[80vh] object-contain z-10 absolute inset-0 m-auto hidden lg:block"
          />

          {/* Content positioned in bottom-left corner for large screens */}
          <div className="p-8 md:px-24 lg:px-16 xl:px-24 lg:w-1/2 xl:w-1/3 text-black z-20 relative lg:absolute lg:bottom-12 lg:left-8 hidden lg:block">
            <h3 className="text-title font-semibold md:text-titlemd xl:text-titlexl">
              Stay on track
            </h3>
            <p className="text-body md:text-body lg:text-bodymd">
              Track your running form live, with precise feedback on which body
              parts are under strain and may risk injury.
            </p>
          </div>

          {/* Video and Infographic for small and medium screens */}
          <div className="p-8 md:px-24 lg:px-16 xl:px-24 lg:w-[50%] xl:w-[40%] space-y-2 block lg:hidden z-20 relative">
            <img
              src={Infographic}
              alt="Infographic with phone hole"
              className="w-full max-w-lg object-contain max-h-[55vh] md:max-h-[70vh] lg:max-h-[40vh]"
            />
            <h3 className="text-title text-black font-semibold md:text-titlemd xl:text-titlexl pt-4">
              Stay on track
            </h3>
            <p className="text-body md:text-body  text-black lg:text-bodymd pb-2">
              Track your running form live, with precise feedback on which body
              parts are under strain and may risk injury.
            </p>
          </div>
        </section>

        {/* Other Sections */}
        <div ref={finalSectionRef}>
          <Purchase />
        </div>

        {/* Scroll Indicator */}
        <div
          className={`w-full fixed bottom-0 flex flex-col items-center p-4 transition-opacity duration-500 ${
            isFinalSectionVisible ? "opacity-0 text-black" : "opacity-100"
          } ${
            isSecondPageVisible && !isFinalSectionVisible
              ? "text-black"
              : "text-white"
          }`}
        >
          <p className="text-h3 md:text-h3md transition-color">Scroll</p>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 transition-color"
          >
            <path
              d="M19 9L12 16L5 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Home;
