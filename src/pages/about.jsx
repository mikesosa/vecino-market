import Image from "next/image";
import Head from "next/head";

// import Link from "next/link";
// import clsx from "clsx";

import { Container } from "@/components/Container";
// import {
//   TwitterIcon,
//   InstagramIcon,
//   GitHubIcon,
//   LinkedInIcon,
// } from "@/components/SocialIcons";
import logoBlack from "@/images/vittare-black.svg";
import logoWhite from "@/images/vittare-white.svg";
import { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";

// function SocialLink({ className, href, children, icon: Icon }) {
//   return (
//     <li className={clsx(className, "flex")}>
//       <Link
//         href={href}
//         className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
//       >
//         <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
//         <span className="ml-4">{children}</span>
//       </Link>
//     </li>
//   );
// }

// function MailIcon(props) {
//   return (
//     <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
//       <path
//         fillRule="evenodd"
//         d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
//       />
//     </svg>
//   );
// }

export default function About() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <>
      <Head>
        <title>Anuncios de Venta, Compra y Servicios en Vittare Market</title>
        <meta
          name="description"
          content="Encuentra lo que necesitas en Vittare Market. Anuncios de productos, servicios y más en un solo lugar."
        />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={isDarkMode ? logoWhite : logoBlack}
                alt=""
                unoptimized
              />

              {/* <Image
                src={portraitImage}
                alt=""

                // sizes="(min-width: 1024px) 32rem, 20rem"
                // className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              /> */}
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              VittareMarket - Anuncios de Venta, Compra y Servicios
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>
                Bienvenidos a Vittare Market, la plataforma en línea donde
                puedes encontrar todo lo que necesitas en un solo lugar. Desde
                productos hasta servicios, nuestra comunidad de usuarios es la
                fuente perfecta para encontrar lo que buscas.
              </p>
              <p>
                Nuestro objetivo es brindar una experiencia de compra y venta
                simple y eficiente, y es por eso que nos esforzamos por ofrecer
                una plataforma segura y fácil de usar. Con Vittare Market,
                puedes publicar anuncios, buscar productos y servicios, y
                conectarte con otros usuarios de manera rápida y sencilla.
              </p>
              <p>
                Nos enorgullece formar parte de una comunidad activa y diversa,
                y estamos comprometidos a mejorar constantemente nuestros
                servicios para brindar la mejor experiencia posible a nuestros
                usuarios.
              </p>
            </div>
          </div>
          {/* <div className="lg:pl-20">
            <ul role="list">
              <SocialLink href="#" icon={TwitterIcon}>
                Follow on Twitter
              </SocialLink>
              <SocialLink href="#" icon={InstagramIcon} className="mt-4">
                Follow on Instagram
              </SocialLink>
              <SocialLink href="#" icon={GitHubIcon} className="mt-4">
                Follow on GitHub
              </SocialLink>
              <SocialLink href="#" icon={LinkedInIcon} className="mt-4">
                Follow on LinkedIn
              </SocialLink>
              <SocialLink
                href="mailto:VittareMarket@planetaria.tech"
                icon={MailIcon}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                VittareMarket@planetaria.tech
              </SocialLink>
            </ul>
          </div> */}
        </div>
      </Container>
    </>
  );
}
