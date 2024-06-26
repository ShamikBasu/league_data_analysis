import { useState } from 'react';
import axios from 'axios';

const ImageFetcher = ({ apiEndpoint, options, playerNames = false }) => {
    const [imageSrc, setImageSrc] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [option, setOption] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const fetchImage = async (param) => {
        setLoading(true);
        setError(null);
        try {
            console.log(`api endpoint:: ${apiEndpoint}${param}`)
            const response = await axios.get(`${apiEndpoint}${param}`, {
                responseType: 'arraybuffer',
            });
            const blob = new Blob([response.data], { type: 'image/png' });
            const url = URL.createObjectURL(blob);
            setImageSrc(url);
        } catch (err) {
            setError('Failed to load image');
        }
        setLoading(false);
    };

    const handleRadioChange = (e) => {
        console.log("E TARGET", e.target.value)
        setOption(e.target.value);
        setShowDropdown(e.target.value === 'Debut by year');
        if (e.target.value === 'All debuts over years') {
            fetchImage('/get_debutants_by_year/');
        }
    };

    const handleDropdownChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleDropdownSubmit = () => {
        if (selectedOption && !playerNames) {
            fetchImage('/get_debutants_by_year/' + selectedOption);
        }
        else if (selectedOption && playerNames) {
            fetchImage('/get_debutant_names_by_year/' + selectedOption);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-8 p-8 bg-gray-100 rounded-lg shadow-lg w-full max-w-lg">
            {!playerNames ? (
                <>
                    <div className="mb-8">
                        <label className="mr-4 inline-flex items-center">
                            <input
                                type="radio"
                                name="option"
                                value="All debuts over years"
                                onChange={handleRadioChange}
                                className="form-radio text-blue-600"
                            />
                            <span className="ml-2">All debuts over years</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="option"
                                value="Debut by year"
                                onChange={handleRadioChange}
                                className="form-radio text-blue-600"
                            />
                            <span className="ml-2">Debut by year</span>
                        </label>
                    </div>

                    {showDropdown && (
                        <div className="mb-8 flex flex-col items-center">
                            <select
                                value={selectedOption}
                                onChange={handleDropdownChange}
                                className="p-2 border rounded mb-4 bg-white"
                            >
                                <option value="" disabled>
                                    Select an option
                                </option>
                                {options.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={handleDropdownSubmit}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Submit
                            </button>
                        </div>

                    )}
                </>) : (
                <div className="mb-8 flex flex-col items-center">
                    <label className="mb-4 text-lg font-semibold">Player Names by Debut Year</label>
                    <select
                        value={selectedOption}
                        onChange={handleDropdownChange}
                        className="p-2 border rounded mb-4 bg-white"
                    >
                        <option value="" disabled>
                            Select the year
                        </option>
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleDropdownSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            )}


            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {imageSrc && (
                <div className="flex items-center justify-center">
                    <div className="relative overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-150">
                        <img src={imageSrc} alt="Fetched from API" className="rounded-lg shadow-lg" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageFetcher;
