import { Container } from "@/components/Container";
import { Button } from "@/components/atoms/Button";
import { useRouter } from "next/router";

export function SimpleLayout({ title, intro, children, button }) {
  const { push } = useRouter();
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="grid grid-cols-4">
        <div className="col-span-3">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {intro}
          </p>
        </div>
        {button && (
          <div className="col-span-1 flex mt-6 items-start justify-end">
            {button}
          </div>
        )}
      </header>
      <div className="mt-8 sm:mt-20">{children}</div>
    </Container>
  );
}
