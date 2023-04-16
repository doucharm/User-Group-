import { Table_Display } from "./Component_Display";
import { useCallback, useState, useMemo } from "react";
import { CreateDelayer } from "utils/Delayer";
export const Get_Card_Display = ({ data }) => {
    const id = '95f19c4d-2710-41ee-9e48-9eb0314eedb3'
    const id_find = data
    const selected_group = Get_Group_Data(data, id)
    console.log('selected group info')
    console.log(selected_group)
    const selected_group_components = Get_Group_Components(data, selected_group)
    console.log("components of group")
    console.log(selected_group_components)

    return (
        <main>
            <div class="card  border-success  bg-info mb-3" >
                <div class="card-header">
                    <Get_Card_Header group={selected_group} />
                </div>
                <div class="card-body">
                    Components of the group:
                    <Table_Display component={selected_group_components} />
                </div>

            </div>
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

        if (foundMember) {
            setMember(foundMember);
            setErrorMessage('');
        } else if (foundGroup) {
            setGroup(foundGroup);
            setErrorMessage('');
        } else if (!foundMember) {
            setErrorMessage('Member not found');
            setMember(null);
        } else if (!foundGroup) {
            setErrorMessage('Group not found');
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

const Get_Card_Header = ({ group }) => {
    const Group_Name_Click = ({ group }) => {
        const [temp_name_1, set_group_1] = useState(group.name)
        const [temp_name_2, set_goal_1] = useState(group.goal)
        const [group_name_change, set_name_change] = useState(true)
        const change_event = useCallback(() => set_name_change(!group_name_change))
        if (group_name_change) {
            return (


                <div><p id='changer'>Group name:{temp_name_1}</p> <p id=' changer'> Group goal:{temp_name_2} </p>  <button id='changer' className='btn btn-sm btn-primary' onClick={change_event}>Modify</button></div>


            )
        } else {

            return (
                <div>
                    Group name: <Group_Name_Input value={temp_name_1} placeholder="group name" onChange={set_group_1} />
                    Group goal: <Group_Name_Input value={temp_name_2} placeholder="group goal" onChange={set_goal_1} />
                    <button id='change' className='btn btn-sm btn-success' onClick={change_event}>Submit</button>
                </div>
            )
        }
    }


    const Group_Name_Input = ({ value, placeholder, onChange }) => {
        const [new_value, set_value] = useState(value)



        const reName_Event = useCallback(
            (e) => {
                const newVal = e.target.value
                set_value(newVal)
                onChange(newVal)
            }
        )

        return (
            <input className='form-control' value={new_value} placeholder={placeholder} onChange={reName_Event} />
        )
    }


    return (
        <div>
            <tr>ID: {group.id} </tr>
            <tr><Group_Name_Click group={group} /></tr>
            <tr>Date of creation: {group.date_of_creation}</tr>
            <br />
        </div>
    )
}
const Get_Group_Data = (data, id) => {
    const selected_group = data.groups.filter(item => item.id == id)
    return (
        selected_group[0]
    )
}
const Get_Group_Components = (data, selected_group) => {
    const sub_groups = data.groups.filter(item => selected_group.properties.includes(item.id))
    const members = data.members.filter(item => selected_group.properties.includes(item.id))
    const result =
    {
        sub_groups: sub_groups,
        members: members
    }
    return (result)
}

