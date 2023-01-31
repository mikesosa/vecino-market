import React from "react";
import clsx from "clsx";
import NumberFormat from "react-number-format";

const variantStyles = {
  primary:
    "block w-full appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm",
  secondary:
    "bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70",
};

const Input = React.forwardRef(
  ({ variant = "primary", className, ...props }, ref) => {
    const errorMessage = props.errors?.[props.name]?.message;
    className = clsx(
      "inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none",
      variantStyles[variant],
      className
    );

    return (
      <>
        {props.label && (
          <label
            htmlFor="company-website"
            className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100"
          >
            {props.label}
          </label>
        )}
        <div className="mt-1 flex rounded-md shadow-sm flex-col">
          {props.type === "textarea" ? (
            <textarea ref={ref} className={className} {...props} />
          ) : props.type === "currency" ? (
            <NumberFormat
              getInputRef={ref}
              className={className}
              placeholder={props.placeholder}
              thousandSeparator="."
              decimalSeparator=","
              prefix={props.prefix}
              pattern="[0-9]*"
              inputMode="numeric"
              onValueChange={({ floatValue }) => {
                const newEvent = {
                  target: {
                    name: props.name,
                    value: floatValue,
                  },
                };

                props.onChange(newEvent);
              }}
            />
          ) : props.type === "phone" ? (
            <NumberFormat
              getInputRef={ref}
              className={className}
              placeholder={props.placeholder}
              format="+57 (###) ###-####"
              pattern="[0-9]*"
              inputMode="numeric"
              onValueChange={({ value }) => {
                const newEvent = {
                  target: {
                    name: props.name,
                    value: value,
                  },
                };

                props.onChange(newEvent);
              }}
            />
          ) : (
            // <NumberFormat
            //   getInputRef={ref}
            //   className={className}
            //   placeholder={props.placeholder}
            //   thousandSeparator="."
            //   decimalSeparator=","
            //   prefix={props.prefix}
            //   pattern="[0-9]*"
            //   inputMode="numeric"
            //   onValueChange={({ floatValue }) => {
            //     const newEvent = {
            //       target: {
            //         name: props.name,
            //         value: floatValue,
            //       },
            //     };

            //     props.onChange(newEvent);
            //   }}
            // />
            <input ref={ref} className={className} {...props} />
          )}
          {errorMessage && (
            <label className="text-red-500 text-xs">{errorMessage}</label>
          )}
        </div>
      </>
    );
  }
);

Input.displayName = "Input";

export default Input;
