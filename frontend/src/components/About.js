import NavBar from "./Navbar";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100">
      <NavBar />
      <div className="max-w-3xl mx-auto py-20 px-6 text-center">
        <h1 className="text-4xl font-bold text-sky-700 mb-4">Sobre el sistema</h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          El <span className="font-semibold text-sky-600">Sistema de Tickets IT</span> está diseñado para facilitar la gestión
          de incidencias, solicitudes y requerimientos técnicos dentro de una organización.
          Con esta plataforma, los usuarios pueden reportar problemas, hacer seguimiento a sus solicitudes
          y comunicarse eficientemente con el equipo de soporte técnico.
        </p>

        <div className="mt-10 bg-white/80 shadow-md rounded-xl p-6 text-left">
          <h2 className="text-2xl font-semibold text-sky-700 mb-2">📌 Características:</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Creación y seguimiento de tickets en tiempo real</li>
            <li>Acceso administrativo para gestión de incidencias</li>
            <li>Interfaz clara y amigable para todos los usuarios</li>
            <li>Integración con gráficos y panel de control</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
