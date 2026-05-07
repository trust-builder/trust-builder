'use client'; // Necesario porque usamos hooks de React
import { useState } from 'react';
import { supabase } from '../lib/supabase'; // Asegúrate de que la ruta sea correcta
import { useUser } from '@clerk/nextjs'; // Para capturar el ID del usuario actual

export default function ReviewForm() {
    const { user } = useUser(); // Obtenemos el usuario autenticado
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5); // Valor por defecto
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            alert("Debes iniciar sesión para dejar una reseña.");
            return;
        }

        setLoading(true);

        // Enviar datos a Supabase
        const { error } = await supabase
            .from('reviews')
            .insert([
                {
                    user_id: user.id, // Vinculamos con el ID de Clerk
                    customer_name: name,
                    comment: comment,
                    rating: rating
                }
            ]);

        if (error) {
            console.error('Error al guardar:', error);
            alert('Hubo un error al guardar tu reseña.');
        } else {
            alert('¡Reseña enviada con éxito!');
            // Limpiar el formulario
            setName('');
            setComment('');
            setRating(5);
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-indigo-950 mb-6">Comparte tu experiencia</h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nombre completo</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 rounded-lg border border-slate-200"
                        placeholder="Ej: Juan Pérez"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tu comentario</label>
                    <textarea
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-3 rounded-lg border border-slate-200"
                        rows={4}
                        placeholder="¿Qué te pareció nuestro servicio?"
                    />
                </div>

                {/* Aquí iría tu componente StarRating, asegúrate de pasarle el setRating */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition disabled:bg-slate-300"
                >
                    {loading ? 'Enviando...' : 'Enviar reseña'}
                </button>
            </div>
        </form>
    );
}
