import { ReactNode } from "react";
import Header from "./Header";

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div>
      <Header />
      <div className="layout-content">{children}</div>
    </div>
  );
}

export default Layout;
