const axios = require('axios');
const linkMapApi = 'https://nominatim.openstreetmap.org/search.php';

async function getCoordinates(cep) {
    try {
        const response = await axios.get(`${linkMapApi}?q=${encodeURIComponent(cep)}&countrycodes=br&format=jsonv2`, {
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        });

        if (!response.data || response.data.length === 0) {
            throw new Error('Localização não encontrada');
        }

        const location = response.data[0];

        if (!location || !location.lat || !location.lon || !location.display_name) {
            throw new Error('Localização não foi encontrada com esses dados');
        }

        return { lat: location.lat, lon: location.lon, display_name: location.display_name };

    } catch (error) {
        console.error('Erro ao chamar a API de mapas:', error.message || error);
        throw new Error('Erro ao chamar a API de mapas');
    }
}

async function getGoogleMapsLink(local){
    try {
        const { lat, lon } = local;

        const googleMapsLink = `https://www.google.com/maps?q=${lat},${lon}`;

        return googleMapsLink;

    } catch(error){
        console.error(error);
        throw new Error('Erro gerar o link do Google Maps');
    }
}

module.exports = { getCoordinates, getGoogleMapsLink };