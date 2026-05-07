import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'; // Asegúrate de importar tu cliente

export default function ReviewList() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        async function fetchReviews() {
            const { data, error } = await supabase
                .from('reviews')
                .select('*')
                .order('created_at', { ascending: false }); // Las más nuevas primero

            if (error) console.error('Error al cargar:', error);
            else setReviews(data);
        }

        fetchReviews();
    }, []);

    return (
        <div>
            <h2>Opiniones de nuestros usuarios</h2>
            {reviews.map((review: any) => (
                <div key={review.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px' }}>
                    <p><strong>Calificación:</strong> {review.rating} estrellas</p>
                    <p>{review.feedback}</p>
                </div>
            ))}
        </div>
    );
}
