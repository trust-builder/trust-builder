"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase'; // Importamos el cliente que creamos

export default function StarRating() {
    const [loading, setLoading] = useState(false);

    const handleSaveReview = async () => {
        setLoading(true);

        // Ejemplo de inserción de datos
        const { error } = await supabase
            .from('reviews')
            .insert([{
                rating: rating,
                feedback: feedback,
                user_name: userName
            }]);

        if (error) {
            console.error('ERROR DETALLADO:', JSON.stringify(error, null, 2));
            alert('Error: ' + error.message); // Esto te dirá el motivo exacto
        } else {
            alert('¡Reseña guardada con éxito!');
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
            <h2 className="text-xl font-bold text-gray-900">¿Qué tal fue tu experiencia?</h2>
            <button
                onClick={handleSaveReview}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                {loading ? 'Guardando...' : 'Enviar Reseña'}
            </button>
        </div>
    );
}
