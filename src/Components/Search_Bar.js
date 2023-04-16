import { useState } from "react";

export const Search_Bar_Display = ({ data }) => {
    const id_find = data
    return (
        <main>
            <div>
                <SearchBar id={id_find} />
            </div>
        </main>
    )
}

const SearchBar = ({ id }) => {
    const [searchId, setSearchId] = useState('');
    const [member, setMember] = useState(null);
    const [group, setGroup] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSearch = () => {
        if (searchId === '') {
            setErrorMessage('Please enter an ID');
            setMember(null);
            return;
        }

        const foundMember = id.members.find(member => member.id === searchId);
        const foundGroup = id.groups.find(group => group.id === searchId);

        if (foundMember && !foundGroup) {
            setMember(foundMember);
            setGroup(null);
            setErrorMessage('');
        } else if (foundGroup && !foundMember) {
            setGroup(foundGroup);
            setMember(null);
            setErrorMessage('');
        } else {
            setErrorMessage('not found');
            setMember(null);
            setGroup(null);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter member ID"
                value={searchId}
                onChange={e => setSearchId(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            {errorMessage && <p>{errorMessage}</p>}
            {member && (
                <div>
                    <p>Name: {member.name}</p>
                    <p>Surname: {member.surname}</p>
                    <p>Email: {member.email}</p>
                    <p>Owner ID: {member.owner_id}</p>
                    <p>Role: {member.role}</p>
                </div>
            )}
            {group && (
                <div>
                    <p>Name: {group.name}</p>
                    <p>Goal: {group.goal}</p>
                    <p>Date of creation: {group.date_of_creation}</p>
                </div>
            )}
        </div>
    );
}