import { useState } from 'react';

export const SearchBar = ({ setDisplayId }) => {
    const [inputId, setInputId] = useState('');

    const handleInputChange = (event) => {
        setInputId(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setDisplayId(inputId);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="inputId">Enter ID:</label>
            <input
                id="inputId"
                type="text"
                value={inputId}
                onChange={handleInputChange}
            />
            <button type="submit">Submit</button>
        </form>
    );
};