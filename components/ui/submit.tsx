import clsx from "clsx";
import { Button } from "./button";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Submit({ children, className, ...rest }: ButtonProps) {
  return (
    <Button {...rest} className={className} variant="outline">
      {children}
    </Button>
  );
}
