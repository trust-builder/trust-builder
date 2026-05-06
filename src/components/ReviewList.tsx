'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useUser } from '@clerk/nextjs';

export default function ReviewList() {
    const { user } = useUser();
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchReviews() {
            // Si el usuario no ha cargado, salimos
            if (!user) {
                setLoading(false);
                return;
            }

            // Consultamos Supabase filtrando solo las reseñas del usuario actual
            const { data, error } = await supabase
                .from('reviews')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error al cargar reseñas:', error);
            } else {
                setReviews(data || []);
            }
            setLoading(false);
        }

        fetchReviews();
    }, [user]);

    if (loading) {
        return <div className="text-center py-4 text-slate-600">Cargando tus reseñas...</div>;
    }

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-indigo-950">Mis Reseñas</h2>

            {reviews.length === 0 ? (
                <p className="text-slate-500">Aún no tienes reseñas registradas.</p>
            ) : (
                <div className="grid gap-4">
                    {reviews.map((review: any) => (
                        <div key={review.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-start">
                                <h3 className="font-semibold text-lg">{review.customer_name}</h3>
                                <span className="text-sm font-bold text-indigo-600">{review.rating} ★</span>
                            </div>
                            <p className="text-slate-600 mt-2">{review.comment}</p>
                            <p className="text-xs text-slate-400 mt-3">
                                {new Date(review.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}