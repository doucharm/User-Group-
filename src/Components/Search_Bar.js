/*import React, { useState } from "react";
import { Card_Display } from "./Card_Display";
import { Search } from "react-bootstrap-icons";
import {data} from 'Data/data'
export const Search_Bar_Display = () => {
    return (
        <main>
            <div>
                <SearchBar data={data.data} />
            </div>
        </main>
    )
}

const SearchBar = ({ data }) => {
    const [searchId, setSearchId] = useState('');
    const [searchName, setSearchName] = useState('');
    const [member, setMember] = useState(null);
    const [memberOptions, setMemberOptions] = useState([]);
    const [groupOptions, setGroupOptions] = useState([]);
    const [group, setGroup] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [typing, setTyping] = useState(false);
    const [searchType, setSearchType] = useState('member');

    const handleSearch = () => {
        if (searchId === '' && searchName === '') {
            setErrorMessage('Please enter an ID or name');
            setMember(null);
            setGroup(null);
            return;
        }

        setMember(null);
        setGroup(null);

        if (searchType === 'member') {
            const foundMembersByID = data.members.find(member => member.id === searchId);
            const foundMembersByName = data.members.filter((member) => member.name.toLowerCase().includes(searchName.toLowerCase()) || member.surname.toLowerCase().includes(searchName.toLowerCase()));

            if (foundMembersByID) {
                setMember(foundMembersByID);
                setGroup(null);
                setErrorMessage('');
            } else if (foundMembersByName.length === 1) {
                setMember(foundMembersByName[0]);
                setGroup(null);
                setErrorMessage('');
            } else if (foundMembersByName.length > 1) {
                setErrorMessage('Please choose a member from the list');
                setMember(null);
                setGroup(null);
                setMemberOptions(foundMembersByName);
            } else {
                setErrorMessage('No member found');
                setMember(null);
                setGroup(null);
            }
        }
        else if (searchType === 'group') {
            const foundGroupsByID = data.groups.find(group => group.id === searchId);
            const foundGroupsByName = data.groups.filter((group) => group.name.toLowerCase().includes(searchName.toLowerCase()));

            if (foundGroupsByID) {
                setGroup(foundGroupsByID);
                setMember(null);
                setErrorMessage('');
            }
            else if (foundGroupsByName.length === 1) {
                setGroup(foundGroupsByName[0]);
                setMember(null);
                setErrorMessage('');
            }
            else if (foundGroupsByName.length > 1) {
                setErrorMessage('Please choose a group from the list');
                setMember(null);
                setGroup(null);
                setGroupOptions(foundGroupsByName);
            } else {
                setErrorMessage('No group found');
                setMember(null);
                setGroup(null);
            }
        }
    };

    const handleSelectOption = (selectedOption) => {
        if (searchType === 'member') {
            setMember(selectedOption);
            setMemberOptions([]);
            setSearchName(selectedOption.name);
        } else if (searchType === 'group') {
            setGroup(selectedOption);
            setGroupOptions([]);
            setSearchName(selectedOption.name);
        }
        setSearchId('');
        setSearchName('');
        setTyping(false);
    };

    const handleInputChange = (e) => {
        setSearchName(e.target.value);
        setTyping(true);
        if (e.target.value === "") {
            setMemberOptions([]);
            setGroupOptions([]);
            setTyping(false);
        }
    };

    const handlesearchTypeChange = (mode) => {
        setSearchType(mode);
        setMember(null);
        setGroup(null);
        setErrorMessage("");
        if (mode === 'group') {
            setGroupOptions([]);
        }
        else if (mode === 'member') {
            setMemberOptions([]);
        }
    };

    return (
        <div>
            <div className="search-mode-buttons">
                <label>
                    <input
                        type="checkbox"
                        checked={searchType === 'member'}
                        onChange={() => handlesearchTypeChange('member')}
                    />
                    Search member
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={searchType === 'group'}
                        onChange={() => handlesearchTypeChange('group')}
                    />
                    Search group
                </label>
            </div>
            {searchType === 'member' && (
                <div>
                    <input
                        type="text"
                        placeholder="Enter ID or name"
                        value={searchId || searchName}
                        onChange={(e) => {
                            setSearchId(e.target.value);
                            handleInputChange(e);
                        }}
                    />
                    <button onClick={handleSearch}>
                        <Search />
                    </button>
                    {typing && memberOptions.length > 0 && (
                        <table className="table table-hover table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Surname</th>
                                </tr>
                            </thead>
                            <tbody>
                                {memberOptions.map((member) => (
                                    <tr key={member.id} onClick={() => handleSelectOption(member)}>
                                        <td>{member.name}</td>
                                        <td>{member.surname}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
            {searchType === 'group' && (
                <div>
                    <input
                        type="text"
                        placeholder="Enter ID or name"
                        value={searchId || searchName}
                        onChange={(e) => {
                            setSearchId(e.target.value);
                            handleInputChange(e);
                        }}
                    />
                    <button onClick={handleSearch}>
                        <Search />
                    </button>
                    {groupOptions.length > 0 && (
                        <div className="group-options">
                            {groupOptions.map((group) => (
                                <p key={group.id} onClick={() => handleSelectOption(group)}>
                                    {group.name}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            )}
            {typing && errorMessage && <p>{errorMessage}</p>}
            {member && (
                <table className="table table-bordered table-striped table-sm">
                    <tbody>
                        <tr><td>Name</td> <td>{member.name}</td></tr>
                        <tr><td>Surname</td> <td>{member.surname}</td></tr>
                        <tr><td>Email</td> <td>{member.email}</td></tr>
                        <tr><td>Owner ID</td> <td>{member.owner_id}</td></tr>
                        <tr><td>Role</td> <td>{member.role}</td></tr>
                    </tbody>
                </table>
            )}
            {group && (
                <Card_Display key={group.id} id={group.id} data={data} />
            )}
        </div>
    );
};
*/

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