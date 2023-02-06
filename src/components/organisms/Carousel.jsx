import { useState, useContext, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import { ThemeContext } from "@/contexts/ThemeContext";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";
import Link from "next/link";
import clsx from "clsx";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { handleError } from "@apollo/client/link/http/parseAndCheckHttpResponse";

function Arrow(props) {
  const disabled = props.disabled ? " arrow--disabled" : "";
  return (
    <>
      {props.left ? (
        <ChevronLeftIcon
          className={clsx("h-6 w-6 mr-2 cursor-pointer", disabled)}
          onClick={props.onClick}
        />
      ) : (
        <ChevronRightIcon
          className={clsx("h-6 w-6 mr-2 cursor-pointer", disabled)}
          onClick={props.onClick}
        />
      )}
    </>
  );
}

export default function Carousel({
  images,
  showArrows = true,
  slidesPerView = 1,
  showDots = true,
  autoplay = false,
  loop = false,
  classes = "",
  handleRemoveImage,
}) {
  const { isDarkMode } = useContext(ThemeContext);
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      loop: loop,
      slides: {
        perView: slidesPerView,
        spacing: 15,
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [
      (slider) => {
        if (autoplay) {
          let timeout;
          let mouseOver = false;
          function clearNextTimeout() {
            clearTimeout(timeout);
          }
          function nextTimeout() {
            clearTimeout(timeout);
            if (mouseOver) return;
            timeout = setTimeout(() => {
              slider.next();
            }, 1000);
          }
          slider.on("created", () => {
            slider.container.addEventListener("mouseover", () => {
              mouseOver = true;
              clearNextTimeout();
            });
            slider.container.addEventListener("mouseout", () => {
              mouseOver = false;
              nextTimeout();
            });
            nextTimeout();
          });
          slider.on("dragStarted", clearNextTimeout);
          slider.on("animationEnded", nextTimeout);
          slider.on("updated ", nextTimeout);
        }
      },
    ]
  );

  useEffect(() => {
    setTimeout(() => {
      setSlides(images);
      if (instanceRef) {
        instanceRef.current.update();
      }
    }, 100);
  });

  return (
    <div className="block w-full aspect-w-10 aspect-h-7  overflow-hidden">
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {slides.map(({ src, alt, width, height, href, element }, index) => {
            if (element) {
              return (
                <div
                  key={index}
                  className={clsx(
                    classes,
                    "keen-slider__slide",
                    `number-slide${index + 1}`
                  )}
                >
                  <div className="object-cover h-52 w-full">{element}</div>
                </div>
              );
            }

            if (!href) {
              return (
                <div
                  key={index}
                  className={clsx(
                    classes,
                    "keen-slider__slide",
                    `number-slide${index + 1}`
                  )}
                >
                  <Image
                    priority
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                  />
                  {handleRemoveImage && (
                    <div
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 m-2 cursor-pointer z-30 bg-white rounded-full flex justify-center items-center"
                    >
                      <XCircleIcon
                        className="h-8 w-8 text-gray-800"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
              );
            }

            <Link href={href} passHref key={index}>
              <a target="_blank" rel="noopener noreferrer">
                <div
                  className={clsx(
                    classes,
                    "keen-slider__slide",
                    `number-slide${index + 1}`
                  )}
                >
                  <Image
                    src={src}
                    alt={alt}
                    priority
                    className="object-cover h-52 w-full"
                    // layout={width ? undefined : "fill"}
                    // objectFit="cover"
                    width={width}
                    height={height}
                  />
                </div>
              </a>
            </Link>;
          })}
        </div>

        {showArrows && loaded && instanceRef.current && (
          <div className="relative bottom-0 bg-primary-600 text-zinc-600 dark:text-zinc-400 bg-opacity-75 w-full h-12 flex justify-center items-center">
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />
            {currentSlide + 1}/{slides.length}
            <Arrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef?.current?.track?.details?.slides.length - 1
              }
            />
          </div>
        )}
      </div>
      {showDots && loaded && instanceRef.current && (
        <div className="dots">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              ></button>
            );
          })}
        </div>
      )}
    </div>
  );
}
