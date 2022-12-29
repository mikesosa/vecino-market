import { useEffect, useRef } from "react";
import { ApolloProvider } from "@apollo/client";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import client from "@/lib/clients/apollo-client";
import "@/styles/tailwind.css";
import "focus-visible";
import ThemeContextProvider from "@/contexts/ThemeContext";

function usePrevious(value) {
  let ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default function App({ Component, pageProps, router }) {
  let previousPathname = usePrevious(router.pathname);

  return (
    <ApolloProvider client={client}>
      <ThemeContextProvider>
        <div className="fixed inset-0 flex justify-center sm:px-8">
          <div className="flex w-full max-w-7xl lg:px-8">
            <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
          </div>
        </div>
        <div className="relative">
          <Header />
          <main>
            <Component previousPathname={previousPathname} {...pageProps} />
          </main>
          <Footer />
        </div>
      </ThemeContextProvider>
    </ApolloProvider>
  );
}
