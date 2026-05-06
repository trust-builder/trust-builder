import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
            <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-extrabold text-indigo-950 tracking-tight">
                    Trust<span className="text-indigo-600">Builder</span>
                </Link>

                {/* Enlaces de navegación */}
                <div className="flex items-center space-x-8">
                    <Link href="/" className="text-slate-600 hover:text-indigo-600 font-medium transition">Inicio</Link>
                    <Link href="#" className="text-slate-600 hover:text-indigo-600 font-medium transition">Servicios</Link>
                    <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                        Empezar ahora
                    </button>
                </div>
            </div>
        </nav>
    );
}