import axios from 'axios';

const API_KEY = 'SUA_CHAVE';
const API_HOST = 'v3.football.api-sports.io';

export const getProximoJogoFlamengo = async () => {
  try {
    const response = await axios.get('https://v3.football.api-sports.io/fixtures', {
      headers: {
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY
      },
      params: {
        team: '1211', // ID do Flamengo na API
        next: 1
      }
    });
    return response.data.response[0];
  } catch (error) {
    console.error('Erro na API:', error);
    return null;
  }
};