import Head from "next/head";
import { Card } from "@/components/Card";
import { SimpleLayout } from "@/components/SimpleLayout";
import Carousel from "@/components/organisms/Carousel";
import { formatDate } from "@/lib/formatDate";
import client from "@/lib/clients/apollo-client";
import { GET_ITEM_BY_ID } from "@/lib/gpl/queries/getItemById";
import { ItemLayout } from "@/components/ItemLayout";

export default function Item({ item }) {
  const getPhotos = (photos) => {
    return photos.map(({ attributes }) => {
      return {
        src: process.env.NEXT_PUBLIC_VECINO_MARKET_API_URL + attributes.url,
        alt: "",
        width: 300,
        height: 300,
      };
    });
  };

  const breadcrumbs = [
    { id: 1, name: "Se vende", href: "/" },
    { id: 2, name: item.attributes.title, href: "#" },
  ];

  return (
    <>
      <Head>
        <title>{item.attributes.title} - VittareMarket</title>
        <meta
          name="description"
          content="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
        />
      </Head>
      <ItemLayout
        title="VittareMarket - Se vende"
        intro='En esta página, encontrarás una gran variedad de artículos que se venden en tu vecindario. Si quieres publicar un anuncio, solo tienes que hacer clic en el botón "Publicar anuncio" y sigue las instrucciones.'
      >
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
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
                {item.attributes.title}
              </h1>
            </div>

            <section aria-labelledby="information-heading" className="mt-4">
              <h2 id="information-heading" className="sr-only">
                Product information
              </h2>

              <div className="flex items-center">
                <p className="text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
                  ${item.attributes.price}
                </p>
              </div>

              <div className="mt-4 space-y-6">
                <p className="text-base text-zinc-600 dark:text-zinc-400">
                  {item.attributes.description}
                </p>
              </div>
            </section>
          </div>

          {/* Product image */}
          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
              {item.attributes.photos.data.length > 0 ? (
                <Carousel
                  images={getPhotos(item.attributes.photos.data)}
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
            <section aria-labelledby="options-heading">
              <h2 id="options-heading" className="sr-only">
                Product options
              </h2>
            </section>
          </div>
        </div>
      </ItemLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { params: id } = context;
  const {
    data: { item },
  } = await client.query({
    query: GET_ITEM_BY_ID,
    variables: {
      id: id.itemId,
    },
  });

  return {
    props: {
      item: item.data,
    },
  };
}
