import { useState, useContext } from "react";
import { useKeenSlider } from "keen-slider/react";
import { ThemeContext } from "@/contexts/ThemeContext";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";
import Link from "next/link";
import { Fragment } from "react";
import clsx from "clsx";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

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
}) {
  const { isDarkMode } = useContext(ThemeContext);
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
          slider.on("updated", nextTimeout);
        }
      },
    ]
  );

  return (
    <div className="block w-full aspect-w-10 aspect-h-7  overflow-hidden">
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {images.map(({ src, alt, width, height, href }, index) => {
            const clickable = (
              <Link href={href} passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <div
                    className={`keen-slider__slide ${
                      classes !== ""
                        ? clsx(classes)
                        : ` number-slide${index + 1}`
                    }`}
                  >
                    <Image
                      src={src}
                      alt={alt}
                      layout={width ? undefined : "fill"}
                      objectFit="cover"
                      width={width}
                      height={height}
                    />
                  </div>
                </a>
              </Link>
            );
            const nonClickable = (
              <div
                className={`keen-slider__slide ${
                  classes !== "" ? clsx(classes) : ` number-slide${index + 1}`
                }`}
              >
                <Image
                  src={src}
                  alt={alt}
                  layout={width ? undefined : "fill"}
                  objectFit="cover"
                  width={width}
                  height={height}
                />
              </div>
            );
            return (
              <Fragment key={index}>{href ? clickable : nonClickable}</Fragment>
            );
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
            {currentSlide + 1}/{images.length}
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
