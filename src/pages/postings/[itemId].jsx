import Head from "next/head";
import { useState, useEffect } from "react";
import { Button } from "@/components/atoms/Button";
import Carousel from "@/components/organisms/Carousel";
import { formatCurrency } from "@/lib/formatCurrency";
import client from "@/lib/clients/apollo-client";
import { GET_ITEMS } from "@/lib/gpl/queries/getItems";
import { GET_ITEM_BY_ID } from "@/lib/gpl/queries/getItemById";
import { UPDATE_ITEM } from "@/lib/gpl/mutations/updateItem";
import useVerificationModal from "@/hooks/useVerificationModal";
import marketClient from "@/lib/clients/marketClient";
import { useMutation } from "@apollo/client";
import { ItemLayout } from "@/components/ItemLayout";

export default function Item({ item }) {
  const [updateItem, { loading: deletingPost, error: deletePostError }] =
    useMutation(UPDATE_ITEM);
  const [loading, setLoading] = useState(false);
  const { isVerified, showVerificationModal, verificationModal } =
    useVerificationModal();

  const getPhotos = (photos) => {
    return photos.map(({ attributes }) => {
      return {
        src: attributes.url,
        width: attributes.width,
        height: attributes.height,
        alt: item?.attributes?.title,
      };
    });
  };

  const breadcrumbs = [
    { id: 1, name: "Se vende", href: "/" },
    { id: 2, name: item?.attributes?.title, href: "#" },
  ];

  const title = `${item?.attributes?.title} - VittareMarket`;

  const onSubmit = async (data) => {
    return await updateItem({
      variables: {
        id: data?.id,
        active: false,
      },
    })
      .then((res) => {
        window.location.href = "/postings";
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isVerified.isVerified) {
      onSubmit(isVerified.payload);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVerified]);

  const handleDelete = async () => {
    setLoading(true);
    // 1 - Send verification code to phone number
    await marketClient
      .post("/api/send-code", {
        phone: item?.attributes?.phone_number,
      })
      .then(({ data: response }) => {
        showVerificationModal(response.to, item);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={item?.attributes?.description} />
      </Head>
      <ItemLayout
        title="VittareMarket - Se vende"
        // intro="Antes de publicar un anuncio, recuerda que no se pueden borrar y que se borran después de 15 días."
      >
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <nav aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-2">
              {breadcrumbs.map((breadcrumb, breadcrumbIdx) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center text-sm">
                    <a
                      href={breadcrumb.href}
                      className="font-medium text-zinc-600 hover:text-zinc-600 dark:text-zinc-400"
                    >
                      {breadcrumb.name}
                    </a>
                    {breadcrumbIdx !== breadcrumbs.length - 1 ? (
                      <svg
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight  text-zinc-800 dark:text-zinc-100 sm:text-4xl">
              {item?.attributes?.title}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

            <div className="flex items-center">
              <p className="text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
                {formatCurrency(item?.attributes?.price)}
              </p>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-zinc-600 dark:text-zinc-400">
                {item?.attributes?.description}
              </p>
            </div>
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
            {item?.attributes?.photos.data.length > 0 ? (
              <Carousel
                images={getPhotos(item?.attributes?.photos.data)}
                classes="relative h-96 flex items-center justify-center"
                loop
                showArrows
                showDots={false}
              />
            ) : (
              <p className="text-base text-center text-zinc-600 dark:text-zinc-400">
                Este anuncio no tiene fotos
              </p>
            )}
          </div>
        </div>
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          {item?.attributes?.phone_number && (
            <Button
              className="w-full py-4 sm:py-2 sm:w-auto"
              href={`https://wa.me/57${item?.attributes?.phone_number}?text=Hola,%20me%20interesa%20tu%20anuncio%20en%20VittareMarket%20https://vittaremarket.shop/postings/${item.id}`}
              target="_blank"
            >
              Contactar al vendedor
            </Button>
          )}
          <div className="mt-5">
            <Button
              variant="danger"
              className="w-full py-4 sm:py-2 sm:w-auto bg-red-400"
              onClick={() => {
                handleDelete();
              }}
            >
              {deletingPost || loading ? "Eliminando..." : "Eliminar"}
            </Button>
          </div>
        </div>
        {verificationModal}
      </ItemLayout>
    </>
  );
}

export async function getStaticPaths() {
  // Define a list of paths to be statically generated.
  const {
    data: { items },
  } = await client.query({
    query: GET_ITEMS,
    variables: {},
  });
  const paths = items?.data?.map(({ id }) => ({
    params: {
      itemId: id,
    },
  }));
  return {
    paths,
    fallback: true, // false or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const { itemId } = params;
  try {
    const { data } = await client.query({
      query: GET_ITEM_BY_ID,
      variables: {
        id: itemId,
      },
    });

    return {
      props: {
        item: data?.item?.data,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}
