import { useState } from 'react';

export const SearchBar = ({ onSearch }) => {
    const [inputData, setInputData] = useState('');

    const handleInputChange = (event) => {
        setInputData(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(inputData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="inputData">Enter:</label>
            <input
                id="inputData"
                type="text"
                value={inputData}
                onChange={handleInputChange}
            />
            <button type="submit">Submit</button>
        </form>
    );
};
