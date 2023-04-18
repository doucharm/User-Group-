import { useState } from "react";
import { Get_Card_Display } from "./Card_Display";
import { Search } from "react-bootstrap-icons";
export const Search_Bar_Display = ({ data }) => {
    return (
        <main>
            <div>
                <SearchBar data={data} />
            </div>
        </main>
    )
}

const SearchBar = ({ data }) => {
    const [searchId, setSearchId] = useState('');
    const [member, setMember] = useState(null);
    const [group, setGroup] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSearch = () => {
        if (searchId === '') {
            setErrorMessage('Please enter an ID');
            setMember(null);
            setGroup(null);
            return;
        }

        setGroup(null);

        const foundMember = data.members.find(member => member.id === searchId);
        const foundGroup = data.groups.find(group => group.id === searchId);

        if (foundMember && !foundGroup) {
            setMember(foundMember);
            setGroup(null);
            setErrorMessage('');
        } else if (foundGroup && !foundMember) {
            setGroup(foundGroup);
            setMember(null);
            setErrorMessage('');
        } else {
            setErrorMessage('No ID match');
            setMember(null);
            setGroup(null);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter ID"
                value={searchId}
                onChange={e => setSearchId(e.target.value)}
            />
            <button onClick={handleSearch}><Search></Search></button>
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
                <Get_Card_Display key={group.id} id={group.id} data={data}/>
            )}
        </div>
    );
}