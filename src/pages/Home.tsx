// src/pages/Home.tsx

import React, { useState, useEffect, useRef } from "react";
import ShoeGif from "../assets/images/spinningshoe.gif";
import Infographic from "../assets/images/infographic.png";
import Chevron from "../assets/icons/chevron.svg";
import "../App.css";
import Purchase from "../components/Purchase";

// Define prop type for setLogoColor
type HomeProps = {
  setLogoColor: React.Dispatch<React.SetStateAction<string>>;
};

const Home: React.FC<HomeProps> = ({ setLogoColor }) => {
  const skipLoading = true; // Set to `true` to skip loading pages, `false` to show them
  const [animationStep, setAnimationStep] = useState<number | null>(null);
  const [isFinalSectionVisible, setIsFinalSectionVisible] = useState(false);
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
          setTimeout(step, i * 1000);
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

  return (
    <div>
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
        <section className="w-full h-screen flex flex-col items-center justify-start pt-20 snap-start">
          <img
            src={ShoeGif}
            alt="Shoe"
            className="w-full object-contain max-h-[50%] md:max-h-[70%] lg:max-h-[80%]"
          />
          <div className=" p-8 md:px-24 lg:px-0 flex flex-col lg:w-[50%] xl:w-[40%] space-y-2">
            <h3 className="text-title font-semibold md:text-titlemd xl:text-titlexl">
              SI V1
            </h3>
            <p className="text-bodyHighlight md:text-bodyHighlightmd xl:text-bodyHighlightxl">
              $120
            </p>
            <p className="text-body md:text-bodymd lg:text-bodyxl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </section>

        {/* Page 2 - App info */}
        <section className="w-full h-screen flex flex-col items-center justify-start pt-20 snap-start">
          <img
            src={Infographic}
            alt="Infographic shoe"
            className="w-full object-contain max-h-[50%] md:max-h-[70%] lg:max-h-[80%]"
          />
          <div className=" p-8 md:px-24 lg:px-0 flex flex-col lg:w-[50%] xl:w-[40%] space-y-2">
            <h3 className="text-title font-semibold md:text-titlemd xl:text-titlexl">
              Stay on track
            </h3>
            <p className="text-body md:text-bodymd lg:text-bodyxl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </section>

        {/* Page 3 - Purchase Component */}
        <div ref={finalSectionRef}>
          <Purchase />
        </div>

        {/* Scroll Indicator */}
        <div
          className={`w-full fixed bottom-0 flex flex-col items-center p-4 transition-opacity duration-500 ${
            isFinalSectionVisible ? "opacity-0" : "opacity-100"
          }`}
        >
          <p className="text-h3 md:text-h3md">Scroll</p>
          <img src={Chevron} alt="chevron" />
        </div>
      </div>
    </div>
  );
};

export default Home;
