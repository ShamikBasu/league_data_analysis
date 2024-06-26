import axios from 'axios';

const fetchData = async (team) => {
  const response = await axios.get(`http://localhost:5000/ipl/get_team_wins_over_year/${team}`);
  return response.data;
};

export default fetchData;

export const fetchDataFirstInnings200 = async () => {
  const response = await axios.get('http://localhost:5000/ipl/get_200_scores/first_innings');
  return response.data;
};

export const fetchDataSecondInnings200 = async () => {
  const response = await axios.get('http://localhost:5000/ipl/get_200_scores/second_innings');
  return response.data;
};