import React, { useEffect, useState } from 'react';
import { getPhraseOfTheDay } from './api';

const App = () => {
    const [phrase, setPhrase] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchPhrase = async () => {
            try {
                const fetchedPhrase = await getPhraseOfTheDay();
                setPhrase(fetchedPhrase);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPhrase();
    }, []);
    if (loading) {
        return <div>Cargando...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    // Obtener la fecha actual
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0'); // Formatear el día con dos dígitos
    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const month = monthNames[currentDate.getMonth()];
    return (
        <div>
            {phrase ? (
                <div className="card">
                    <div className="card-content">
                        <p className="card-title">Frase del Día {day} de {month}</p>
                        <p className="card-para">{phrase.Frase}</p>
                        <p className="card-author">- {phrase.Autor}</p>
                    </div>
                </div>
            ) : (
                <div>No hay frase para hoy.</div>
            )}
        </div>
    );
};
export default App;
