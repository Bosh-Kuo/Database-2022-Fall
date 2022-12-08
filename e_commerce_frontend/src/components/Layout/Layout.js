import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      {/* Todo: Footer */}
    </div>
  );
};
export default Layout;
