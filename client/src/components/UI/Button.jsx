/* Importamos las bibliotecas */
import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";

/* Creamos el componente Button */
const Button = forwardRef(({ className, asChild = false, ...props }, ref) => {
  const Component = asChild ? Slot : "button";
  const classes = clsx(
    "inline-flex items-center justify-center rounded-xl text-sm font-medium shadow-indigo-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    className
  );

  return <Component className={classes} ref={ref} {...props} />;
});

Button.displayName = "Button";

export { Button };
