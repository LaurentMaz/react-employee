import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <div className="flex w-[80%] m-auto py-10">{children}</div>;
};

export default Container;
