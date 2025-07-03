import NavBar from "./Navbar";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100">
      <NavBar />
      <div className="flex flex-col items-center justify-center text-center py-24 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-sky-700 mb-4 drop-shadow">
          🎟️ Bienvenido al Sistema de Tickets IT
        </h1>
        <p className="text-gray-700 text-lg max-w-xl">
          Gestiona solicitudes, reporta incidencias y mantén tu equipo conectado. Todo desde una sola plataforma fácil de usar.
        </p>
        <div className="mt-8">
          <a
            href="/submit-ticket"
            className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-lg transition shadow-md"
          >
            Enviar un Ticket
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
