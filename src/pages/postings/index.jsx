import Head from "next/head";
import { SimpleLayout } from "@/components/SimpleLayout";
import Image from "next/image";
import { formatFromDistance } from "@/lib/formatDate";
import { Button } from "@/components/atoms/Button";
import { useRouter } from "next/router";
import client from "@/lib/clients/apollo-client";
import { GET_ITEMS } from "@/lib/gpl/queries/getItems";
import { formatCurrency } from "@/lib/formatCurrency";

export default function PostingsIndex({ postings }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Anuncios - VittareMarket</title>
        <meta
          name="description"
          content="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
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
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {postings.map(({ id, attributes }) => (
            <div
              key={id}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                {attributes.photos.data[0]?.attributes.url && (
                  <Image
                    width={500}
                    height={500}
                    src={
                      process.env.NEXT_PUBLIC_VECINO_MARKET_API_URL +
                      attributes.photos.data[0].attributes.url
                    }
                    alt={attributes.title}
                    className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col space-y-2 p-4">
                <h3 className="text-sm font-medium text-gray-900">
                  <a href={router.asPath + "/" + id}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {attributes.title}
                  </a>
                </h3>
                <p className="text-sm text-gray-500">
                  {attributes.description.substring(0, 100)}...
                </p>
                <div className="flex flex-1 flex-col justify-end">
                  <p className="text-base font-medium text-gray-900 text-right">
                    {attributes.price
                      ? formatCurrency(attributes.price)
                      : "Gratis"}
                  </p>
                  <p className="mt-2 text-sm italic text-gray-500 text-left">
                    Publicado hace {formatFromDistance(attributes.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          ))}
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
