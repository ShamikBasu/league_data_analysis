// components/TeamDropdown.js
import { useEffect, useState } from 'react';

const EplTeamDropdown = ({ onSelect }) => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            const response = await fetch('http://localhost:5000/epl/list_of_teams/'); 
            const data = await response.json();
            setTeams(data);
        };

        fetchTeams();
    }, []);

    return (
        <select onChange={(e) => onSelect(e.target.value)} className="p-2 border rounded">
            <option value="">Select a team</option>
            {teams.map((team) => (
                <option key={team} value={team}>
                    {team}
                </option>
            ))}
        </select>
    );
};

export default EplTeamDropdown;
