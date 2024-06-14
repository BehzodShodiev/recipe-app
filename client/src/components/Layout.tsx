import React, { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  isShowSearch?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, isShowSearch = true }) => {
  return (
    <div className="flex flex-col min-h-screen p-4">
      <Navbar isShowSearch={isShowSearch}/>
      <main className="flex-1 mt-10">{children}</main>
    </div>
  );
};

export default Layout;
