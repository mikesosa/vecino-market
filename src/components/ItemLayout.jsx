import { Container } from "@/components/Container";

export function ItemLayout({ title, intro, children }) {
  return (
    <Container className="mt-16">
      {/* <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          {intro}
        </p>
      </header> */}
      <div className="mt-16 sm:mt-20">
        <div className="mx-auto max-w-2xl sm:py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          {children}
        </div>
      </div>
    </Container>
  );
}
