import { Outlet } from "react-router-dom";
import Navbar from "./Components/Header/Navbar";
import Footer from "./Components/Footer/Footer";

function PublicLayout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default PublicLayout;