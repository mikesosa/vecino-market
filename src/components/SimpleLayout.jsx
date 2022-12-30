import { Container } from "@/components/Container";

export function SimpleLayout({ title, intro, children, button }) {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="grid grid-cols-4">
        <div className="col-span-4 sm:col-span-3">
          <h1 className="text-center sm:text-left text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {title}
          </h1>
          {button && (
            <p className="hidden sm:block mt-6 text-base text-zinc-600 dark:text-zinc-400">
              {intro}
            </p>
          )}
        </div>
        {button && (
          <div className="col-span-4 sm:col-span-1 flex mt-6 items-start justify-center sm:justify-end">
            {button}
          </div>
        )}
      </header>
      <div className="mt-8 sm:mt-20">{children}</div>
    </Container>
  );
}
