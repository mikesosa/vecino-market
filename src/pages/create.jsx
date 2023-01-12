import { useState, useEffect } from "react";
import Head from "next/head";
import { Button } from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { SimpleLayout } from "@/components/SimpleLayout";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { newItemFormSchema } from "@/lib/schemas/newItemFormSchema";
import { CREATE_ITEM_MUTATION } from "@/lib/gpl/mutations/createItem";
import { useMutation } from "@apollo/client";
import { UPLOAD_FILES_MUTATION } from "@/lib/gpl/mutations/uploadFiles";
import UploadImagesInput from "@/components/organisms/UploadImagesInput";

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
      price: "",
      phone_number: "",
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
    })
      .then(async ({ data: { multipleUpload } }) => {
        const ids = multipleUpload.map((file) => file.data.id);
        await createItem({
          variables: {
            ...data,
            photos: ids,
          },
        })
          .then((res) => {
            console.log("res", res);
            const {
              data: {
                createItem: { data },
              },
            } = res;
            window.location.href = `/postings/${data.id}`;
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
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
        buttonPosition="bottom"
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
            <UploadImagesInput images={files} setImages={setFiles} />
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3">
                <Input
                  className="w-full py-4 text-xl sm:p-2 sm:text-md"
                  type="text"
                  disabled={loading}
                  name="title"
                  errors={errors}
                  placeholder="Titulo de la publicacion"
                  {...register("title")}
                />
              </div>
              <div className="col-span-3 sm:col-span-2">
                <Input
                  className="w-full py-4 text-xl sm:p-2 sm:text-md"
                  type="number"
                  disabled={loading}
                  name="price"
                  errors={errors}
                  placeholder="Precio $"
                  pattern="\d*"
                  {...register("price")}
                />
              </div>
              <div className="col-span-3 sm:col-span-1">
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">+57</span>
                  </div>
                  <Input
                    className="w-full py-4 text-xl pl-16"
                    type="number"
                    disabled={loading}
                    autoComplete="off"
                    pattern="\d*"
                    errors={errors}
                    {...register("phone_number")}
                  />
                </div>
              </div>

              {/* 
              <div className="hidden col-span-3 sm:col-span-2">
                <Input
                  className="w-full py-4 text-xl sm:p-2 sm:text-md"
                  label="Descripcion corta"
                  type="text"
                  name="short_description"
                  placeholder="Ej: Vendemos casa en el centro de la ciudad."
                  errors={errors}
                  {...register("short_description")}
                />
              </div> */}
            </div>

            <div>
              <Input
                className="w-full py-4 text-xl sm:p-2 sm:text-md"
                disabled={loading}
                type="textarea"
                name="description"
                placeholder="Descripción (opcional)"
                rows={3}
                errors={errors}
                {...register("description")}
              />
            </div>
          </div>
        </div>
      </SimpleLayout>
    </>
  );
}
