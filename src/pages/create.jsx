import Image from "next/image";
import { useState, useEffect } from "react";
import Head from "next/head";
import clsx from "clsx";
import { Button } from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { useDropzone } from "react-dropzone";
import { SimpleLayout } from "@/components/SimpleLayout";
import Router, { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { newItemFormSchema } from "@/lib/schemas/newItemFormSchema";
// import createItem from "@/lib/services/createItem";
import { CREATE_ITEM_MUTATION } from "@/lib/gpl/mutations/createItem";
import { useMutation } from "@apollo/client";
import { UPLOAD_FILES_MUTATION } from "@/lib/gpl/mutations/uploadFiles";

const MAX_AMOUNT_OF_FILES = 4;

export default function Home() {
  const [
    createItem,
    {
      loading: { creatingItem },
      error,
    },
  ] = useMutation(CREATE_ITEM_MUTATION);
  const [
    uploadFiles,
    // {
    //   loading: { creatingItem },
    //   error,
    // },
  ] = useMutation(UPLOAD_FILES_MUTATION);
  const [loading, setLoading] = useState(creatingItem ?? false);
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxSize: 2000000,
    maxFiles: MAX_AMOUNT_OF_FILES,

    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const {
    // control,
    register,
    // setValue,
    // watch,
    handleSubmit: handleSubmitForm,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newItemFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      short_description: "",
    },
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (data) => {
    setLoading(true);
    await uploadFiles({
      variables: {
        files,
      },
    }).then(async ({ data: { multipleUpload } }) => {
      const ids = multipleUpload.map((file) => file.data.id);
      await createItem({
        variables: {
          ...data,
          photos: ids,
        },
      })
        .then(
          ({
            data: {
              createItem: { data },
            },
          }) => {
            window.location.href = `/postings/${data.id}`;
          }
        )
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    });
  };

  return (
    <>
      <Head>
        <title>Se vende - VittareMarket</title>
        <meta
          name="description"
          content="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
        />
      </Head>
      <SimpleLayout
        title="VittareMarket - Publicar"
        intro="Publica tu producto en VittareMarket. Recuerda hacerlo con responsabilidad y no publicar productos falsos o que no existan. Asi mismo, no publiques productos que no sean tuyos. "
        button={
          <Button
            className="w-full py-4 sm:py-2 sm:w-auto"
            onClick={handleSubmitForm(handleSubmit)}
            disabled={loading}
          >
            {loading ? "Publicando..." : "Publicar"}
          </Button>
        }
      >
        <div className="rounded-2xl sm:border border-zinc-300 p-0 sm:p-6 dark:border-zinc-700/50">
          <div className="space-y-6 sm:px-4 py-5 sm:p-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3">
                <Input
                  className="w-full py-4 text-xl sm:p-2 sm:text-md"
                  type="text"
                  label="Titulo"
                  name="title"
                  errors={errors}
                  placeholder="Ej: Vendo casa en el centro de la ciudad"
                  {...register("title")}
                />
              </div>
              <div className="col-span-3 sm:col-span-1">
                <Input
                  className="w-full py-4 text-xl sm:p-2 sm:text-md"
                  type="number"
                  label="Precio"
                  name="price"
                  errors={errors}
                  placeholder="Ej: 100000"
                  {...register("price")}
                />
              </div>

              <div className="col-span-3 sm:col-span-2">
                <Input
                  className="w-full py-4 text-xl sm:p-2 sm:text-md"
                  label="Descripcion corta"
                  type="text"
                  name="short_description"
                  placeholder="Ej: Vendemos casa en el centro de la ciudad."
                  errors={errors}
                  {...register("short_description")}
                />
              </div>
            </div>

            <div>
              <Input
                className="w-full py-4 text-xl sm:p-2 sm:text-md"
                label="Descripcion"
                type="textarea"
                name="description"
                placeholder="Describe tu producto/anuncio en detalle."
                rows={3}
                errors={errors}
                {...register("description")}
              />
            </div>

            <div>
              <label className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Fotos
              </label>

              <section className="h-96 sm:h-max mt-1 flex flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                {/* Gallery */}
                <section className="mb-8" aria-labelledby="gallery-heading">
                  <h2 id="gallery-heading" className="sr-only">
                    Recently viewed
                  </h2>
                  <ul
                    role="list"
                    className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                  >
                    {files.map((file) => (
                      <li key={file.name} className="relative">
                        <div
                          className={clsx(
                            "flex items-center",
                            "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500",
                            "group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden"
                          )}
                        >
                          <Image
                            src={file.preview}
                            width={300}
                            height={300}
                            alt=""
                            className={clsx(
                              "group-hover:opacity-75",
                              "object-cover pointer-events-none"
                            )}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
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
                    <div className="flex text-lg sm:text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-teal-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-teal-500 focus-within:ring-offset-2 hover:text-teal-500"
                      >
                        <span>Subir archivos</span>
                      </label>
                      <p className="pl-1 text-zinc-600 dark:text-zinc-400">
                        o arrastra y suelta
                      </p>
                    </div>
                    <p className="text-lg sm:text-xs text-zinc-600 dark:text-zinc-400">
                      PNG, JPG hasta 10MB
                    </p>
                    {fileRejections.length > 0 && (
                      <label className="text-red-500 text-xs">
                        Maximo de archivos es {MAX_AMOUNT_OF_FILES}
                      </label>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </SimpleLayout>
    </>
  );
}
