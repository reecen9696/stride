import React, { useState, useEffect, useRef } from "react";
import ShoeGif from "../assets/images/spinningshoe.gif";
import Infographic from "../assets/images/infographic.png";
import Infographicinsole from "../assets/images/infographicinsole.png";
import Chevron from "../assets/icons/chevron.svg";
import "../App.css";
import PurchaseButton from "../components/PurchaseButton";

// Define prop type for setLogoColor
type HomeProps = {
  setLogoColor: React.Dispatch<React.SetStateAction<string>>;
};

const Home: React.FC<HomeProps> = ({ setLogoColor }) => {
  const animationEnabled = false; // Set to `true` to enable animations, `false` to disable
  const skipLoading = true; // Set to `true` to skip loading pages, `false` to show them
  const [animationStep, setAnimationStep] = useState<number | null>(null);
  const [isFinalSectionVisible, setIsFinalSectionVisible] = useState(false);
  const finalSectionRef = useRef<HTMLDivElement | null>(null);

  const [selectedSize, setSelectedSize] = useState("M");

  useEffect(() => {
    if (skipLoading) {
      // If skipLoading is true, go directly to the final animation step
      setAnimationStep(6);
      setLogoColor("black");
    } else {
      // Start animation sequence with an initial delay
      setTimeout(() => {
        const sequence = [
          () => {
            setAnimationStep(1);
            setLogoColor("black");
          },
          () => setAnimationStep(2),
          () => {
            setAnimationStep(3);
            setLogoColor("white");
          },
          () => setAnimationStep(4),
          () => setAnimationStep(5),
          () => setAnimationStep(6),
        ];

        sequence.forEach((step, i) => {
          setTimeout(step, i * 2000);
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

        {/* Page 3 - Purchase with Size Selector */}
        <section
          className="w-full h-screen flex flex-col items-center justify-start pt-20 snap-start relative"
          ref={finalSectionRef}
        >
          <img
            src={Infographicinsole}
            alt="Infographic shoe"
            className="w-full object-contain max-h-[30%] flex-shrink-0"
          />
          <div className="flex flex-col space-y-2 w-80">
            <div className="flex flex-col space-y-2 w-80">
              <h3 className="text-title font-semibold">SI V1</h3>
              <p className="text-bodyHighlight">$120</p>
              <p className="text-body mb-4">
                SI V1 insoles <br />
                Premium app access <br />
                FREE U$45 Accessory kit included
              </p>
            </div>

            {/* Size Selector */}
            <div className="flex flex-col space-y-2 pt-2">
              <h2 className="text-h2 font-medium">Size:</h2>
              <div className="flex w-full justify-between text-h2 font-medium">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <span
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`cursor-pointer px-4 py-2 relative ${
                      selectedSize === size ? "border border-white" : ""
                    }`}
                  >
                    {size}
                  </span>
                ))}
              </div>
              <p className="underline text-body">Fit / Size Guide</p>
              <div className="w-full h-full flex items-center justify-center">
                <PurchaseButton />
              </div>
            </div>
          </div>
        </section>

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
