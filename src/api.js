import axios from 'axios';

// API base URL for the phrases
const API_BASE_URL = 'https://api-rest-five-nu.vercel.app/api/frase';

// Define a constant for the maximum phrase ID
const MAX_PHRASE_ID = 100;

export const getPhraseOfTheDay = async () => {
    try {
        // Obtener la fecha actual
        const hoy = new Date();
        
        // Calcular el número de días desde el 1 de enero
        const startDate = new Date(hoy.getFullYear(), 0, 1); // Primer día del año
        const diffTime = hoy - startDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        // Calcular el ID de la frase (1-100)
        const idFrase = (diffDays % MAX_PHRASE_ID) + 1; // ID de la frase (1-100)
        // Hacer la solicitud a la API
        const response = await axios.get(`${API_BASE_URL}/${idFrase}`);
        return response.data; // Retornar la frase
    } catch (error) {
        throw new Error('Error fetching phrase: ' + error.message);
    }
};
