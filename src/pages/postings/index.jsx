import Head from "next/head";
import Link from "next/link";
import { SimpleLayout } from "@/components/SimpleLayout";
import Image from "next/image";
import { formatFromDistance } from "@/lib/formatDate";
import { Button } from "@/components/atoms/Button";
import { useRouter } from "next/router";
import client from "@/lib/clients/apollo-client";
import { GET_ITEMS } from "@/lib/gpl/queries/getItems";
import { formatCurrency } from "@/lib/formatCurrency";
import { CheckCircleIcon } from "@heroicons/react/solid";

export default function PostingsIndex({ postings }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Anuncios de Venta, Compra y Servicios en Vittare Market</title>
        <meta
          name="description"
          content="Encuentra lo que necesitas en Vittare Market. Anuncios de productos, servicios y más en un solo lugar."
        />
      </Head>
      <SimpleLayout
        title="VittareMarket - Anuncios"
        intro="En esta página, encontrarás una gran variedad de artículos que se venden en tu vecindario. Los anuncios se borran después de 15 días."
        button={
          <Button className="w-full py-4 sm:w-auto" href="/create">
            Publicar un anuncio
          </Button>
        }
      >
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
            <h4 className="sr-only">Items</h4>
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-zinc-600  "
            >
              {postings.map(({ id, attributes }) => (
                <li key={id} className="p-4 sm:p-6">
                  <div className="flex items-center sm:items-start">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                      {attributes.photos.data[0]?.attributes.url && (
                        <Image
                          width={500}
                          height={500}
                          priority
                          src={attributes.photos.data[0].attributes.url}
                          alt={attributes.title}
                          className="h-full w-full object-cover object-center"
                        />
                      )}
                    </div>
                    <div className="ml-6 flex-1 text-sm">
                      <div className="font-medium text-gray-900 dark:text-zinc-100 sm:flex sm:justify-between">
                        <h5>{attributes.title}</h5>
                        <p className="mt-2 sm:mt-0">
                          {attributes.price
                            ? formatCurrency(attributes.price)
                            : "Gratis"}
                        </p>
                      </div>
                      <p className="hidden text-gray-500 dark:text-zinc-400 sm:mt-2 sm:block">
                        {attributes.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 sm:flex sm:justify-between">
                    <div className="flex items-center">
                      <CheckCircleIcon
                        className="h-5 w-5 text-green-500"
                        aria-hidden="true"
                      />
                      <p className="ml-2 text-sm font-medium text-gray-500 dark:text-zinc-400">
                        Publicado hace{" "}
                        {formatFromDistance(attributes.createdAt)}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center space-x-4 divide-x divide-gray-200 dark:divide-zinc-600 border-t border-gray-200 dark:border-zinc-600 pt-4 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
                      <div className="flex flex-1 justify-center">
                        <Link
                          target="_blank"
                          href={`https://wa.me/57${attributes.phone_number}?text=Hola,%20me%20interesa%20tu%20anuncio%20en%20VittareMarket%20https://vittaremarket.shop/items/${id}`}
                          className="whitespace-nowrap text-teal-600 hover:text-teal-500"
                        >
                          Contactar
                        </Link>
                      </div>
                      <div className="flex flex-1 justify-center pl-4">
                        <a
                          href={router.asPath + "/" + id}
                          className="whitespace-nowrap text-teal-600 hover:text-teal-500"
                        >
                          Ver más
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SimpleLayout>
    </>
  );
}

export async function getServerSideProps() {
  const {
    data: { items },
  } = await client.query({
    query: GET_ITEMS,
    variables: {},
  });

  return {
    props: {
      postings: items.data,
    },
  };
}
