import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-red-500">
      {/* Navbar fixed */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      {/* Footer sticky at bottom */}
      <Footer />
    </div>
  );
}

