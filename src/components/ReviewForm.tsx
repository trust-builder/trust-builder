"use client";

import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Star, CheckCircle2, AlertTriangle, Send } from 'lucide-react';

interface ReviewFormProps {
    projectId: string;
    projectName: string;
    artisanName: string;
}

export default function ReviewForm({ projectId, projectName, artisanName }: ReviewFormProps) {
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) return;

        setIsSubmitting(true);

        try {
            const { error } = await supabase
                .from('reviews')
                .insert([
                    {
                        project_id: projectId,
                        rating,
                        comment,
                        status: 'Validado',
                        created_at: new Date().toISOString(),
                    },
                ]);

            if (error) throw error;
            setSubmitted(true);
        } catch (error: any) {
            console.error('Error:', error.message);
            alert('Error al conectar con la base de datos.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="bg-slate-900 p-10 rounded-2xl border border-emerald-500 text-center max-w-2xl mx-auto my-10 shadow-2xl">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-slate-100 mb-3">¡Calidad Validada!</h2>
                <p className="text-slate-400">El Historial de Transparencia ha sido actualizado correctamente.</p>
            </div>
        );
    }

    return (
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl max-w-2xl mx-auto my-10">
            <div className="mb-10 border-l-4 border-emerald-500 pl-6 text-left">
                <span className="text-emerald-500 text-xs font-black uppercase tracking-widest">TrustBuilder v2.0</span>
                <h2 className="text-4xl font-black text-slate-100 mt-2">Validar Calidad</h2>
                <p className="text-slate-400 mt-4 uppercase text-sm font-semibold">Proyecto: {projectName}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
                    <label className="block text-slate-300 text-sm font-bold mb-4 uppercase tracking-tight text-left">Evaluación Técnica</label>
                    <div className="flex gap-3 justify-start">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className="transition-transform hover:scale-125 focus:outline-none"
                            >
                                <Star className={`w-12 h-12 ${rating >= star ? 'fill-emerald-500 text-emerald-500' : 'text-slate-800'}`} />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-3 text-left">
                    <label className="block text-slate-300 text-sm font-bold uppercase tracking-tight">Comentarios (Análisis IA)</label>
                    <textarea
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-5 text-slate-200 min-h-[150px] focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                        placeholder="Describe los acabados, puntualidad y limpieza..."
                    />
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-xl flex gap-4 text-left items-start">
                    <AlertTriangle className="text-amber-500 w-6 h-6 flex-shrink-0" />
                    <p className="text-xs text-slate-400 italic leading-relaxed">
                        Al confirmar, usted está validando legalmente que los hitos han sido completados según el Registro de Inversión.
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || rating === 0}
                    className={`w-full py-5 rounded-xl font-black uppercase tracking-widest transition-all duration-300 ${isSubmitting || rating === 0
                            ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20'
                        }`}
                >
                    {isSubmitting ? 'Procesando...' : 'Confirmar y Validar Calidad'}
                </button>
            </form>
        </div>
    );
}