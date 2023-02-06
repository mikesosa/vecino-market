import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Carousel from "./Carousel";
import { useEffect } from "react";

const MAX_AMOUNT_OF_FILES = 4;

const UploadImagesInput = ({ images, setImages }) => {
  const [loadedImages, setLoadedImages] = useState([]);
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxSize: 10000000, // 10MB
    maxFiles: MAX_AMOUNT_OF_FILES,

    onDrop: (acceptedFiles) => {
      setImages((prev) => [
        ...prev,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
  });

  const addImagesPlaceholder = (
    <div className="w-full h-52 flex flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
      <div
        {...getRootProps({
          className: "w-full flex justify-center",
        })}
      >
        <input {...getInputProps()} />
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-lg justify-center sm:text-sm text-gray-600">
            <label
              htmlFor="image-upload"
              className="relative cursor-pointer rounded-md font-medium text-teal-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-teal-500 focus-within:ring-offset-2 hover:text-teal-500"
            >
              <span>Subir archivos</span>
            </label>
          </div>
          <p className="text-lg sm:text-xs text-zinc-600 dark:text-zinc-400">
            Max. 4 archivos. Tamaño Máximo 10MB
          </p>
          {fileRejections.length > 0 && (
            <label className="text-red-500 text-xs">
              Máximo de archivos es {MAX_AMOUNT_OF_FILES}
            </label>
          )}
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const slides = images.map(({ preview, name }) => ({
      src: preview,
      alt: name,
      width: 1,
      height: 1,
    }));

    if (slides.length < MAX_AMOUNT_OF_FILES) {
      slides.push({
        element: addImagesPlaceholder,
      });
    }

    setLoadedImages(slides);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  return (
    <div>
      {loadedImages.length && (
        <Carousel
          images={loadedImages}
          classes="relative w-32 h-52 sm:w-52 sm:h-52"
          slidesPerView={loadedImages.length > 1 ? 2 : 1}
          showArrows={false}
          showDots={false}
          handleRemoveImage={(index) => {
            const newImages = [...images];
            newImages.splice(index, 1);
            setImages(newImages);
          }}
        />
      )}
    </div>
  );
};

export default UploadImagesInput;
