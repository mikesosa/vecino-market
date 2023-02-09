import Link from "next/link";
import clsx from "clsx";

const variantStyles = {
  primary:
    "bg-teal-800 font-semibold text-zinc-100 hover:bg-teal-700 active:bg-teal-800 active:text-zinc-100/70 dark:bg-teal-700 dark:hover:bg-teal-600 dark:active:bg-teal-700 dark:active:text-zinc-100/70",
  secondary:
    "bg-teal-50 font-medium text-zinc-900 hover:bg-teal-100 active:bg-teal-100 active:text-zinc-900/60 dark:bg-teal-800/50 dark:text-zinc-300 dark:hover:bg-teal-800 dark:hover:text-zinc-50 dark:active:bg-teal-800/50 dark:active:text-zinc-50/70",
  danger:
    "bg-red-800 font-semibold text-zinc-100 hover:bg-red-700 active:bg-red-800 active:text-zinc-100/70 dark:bg-red-700 dark:hover:bg-red-600 dark:active:bg-red-700 dark:active:text-zinc-100/70",
};

export function Button({ variant = "primary", className, href, ...props }) {
  className = clsx(
    "inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none",
    variantStyles[variant],
    className
  );

  return href ? (
    <Link href={href} className={className} {...props} />
  ) : (
    <button className={className} {...props} />
  );
}
