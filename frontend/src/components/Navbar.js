import React from "react";
import { Navbar, Nav } from "rsuite";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  const handleHomeClick = () => navigate("/");
  const handleTicketClick = () => navigate("/submit-ticket");
  const handleAboutClick = () => navigate("/about");
  const handleLoginClick = () => navigate("/login");

  return (
    <div className="bg-sky-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div
          onClick={handleHomeClick}
          className="text-sky-700 text-2xl font-bold tracking-wide cursor-pointer hover:text-sky-900 transition"
        >
          🎫 TicketPro
        </div>
        <div className="hidden md:flex items-center gap-6">
          <span
            className="text-gray-700 font-medium cursor-pointer hover:text-sky-600 transition"
            onClick={handleTicketClick}
          >
            Enviar Ticket
          </span>
          <span
            className="text-gray-700 font-medium cursor-pointer hover:text-sky-600 transition"
            onClick={handleAboutClick}
          >
            Acerca de
          </span>
          <div className="group relative cursor-pointer">
            <span className="text-gray-700 font-medium hover:text-sky-600 transition">
              Contacto ▾
            </span>
            <div className="absolute hidden group-hover:block bg-white rounded shadow-md py-2 mt-1 w-36 z-10">
              <div className="px-4 py-1 hover:bg-sky-50 cursor-pointer">Vía Email</div>
              <div className="px-4 py-1 hover:bg-sky-50 cursor-pointer">Vía Teléfono</div>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={handleLoginClick}
            className="bg-sky-600 hover:bg-sky-700 text-white font-medium py-1 px-4 rounded-md transition"
          >
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
