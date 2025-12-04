import Navbar from "@/components/ui/navbar";
import type { ReactNode } from "react";

interface ILayout {
  children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <>
      <Navbar />

      <div>{children}</div>
    </>
  );
};

export default Layout;
