import clsx from "clsx";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={clsx("flex w-[80%] m-auto py-10", className)}>
      {children}
    </div>
  );
};

export default Container;
