import Navbar from '../components/Navbar';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Barra de navegación fija y elegante */}
      <Navbar />

      {/* Sección Hero: El encabezado impactante */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto py-20 px-6 text-center">
          <h1 className="text-6xl font-extrabold text-indigo-950 mb-6 tracking-tight">
            Confianza validada
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            La plataforma donde tus clientes construyen tu reputación.
            Calidad, transparencia y resultados en un solo lugar.
          </p>
        </div>
      </section>

      {/* Contenedor principal para Formulario y Lista */}
      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Aquí tus clientes pueden dejar su opinión */}
        <ReviewForm />

        {/* Aquí se muestran las reseñas existentes */}
        <div className="mt-10">
          <ReviewList />
        </div>

      </div>

      {/* Footer minimalista y profesional */}
      <footer className="py-12 text-center text-slate-400 text-sm border-t border-slate-200">
        <p>© 2026 TrustBuilder. Todo el poder de la reputación en tus manos.</p>
      </footer>
    </main>
  );
}