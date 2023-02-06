import Link from "next/link";

import { Container } from "@/components/Container";

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="transition hover:text-teal-500 dark:hover:text-teal-400"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="mt-0 sm:mt-32">
      <Container.Outer>
        <div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <p className="text-xs text-zinc-400 dark:text-zinc-500 text-center">
                Exclusión de responsabilidad: La aplicación de anuncios se
                proporciona sin garantías y el usuario asume todos los riesgos y
                responsabilidades por su uso. No somos responsables por daños
                resultantes del uso de la aplicación.
              </p>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                &copy; {new Date().getFullYear()} dudas y/o sugerencias?{" "}
                <Link
                  className="w-full py-4 sm:py-2 sm:w-auto text-teal-500 hover:text-teal-400 transition"
                  href={`https://wa.me/573124882180?text=Hola,%20me%20gustaría%20saber%20más%20sobre%20VittareMarket`}
                  target="_blank"
                >
                  escríbenos
                </Link>
              </p>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  );
}
