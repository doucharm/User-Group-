import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { v1 } from 'uuid'
<<<<<<< HEAD
import { TextInput } from './Text_Input';
import { Hourglass, HouseAdd } from 'react-bootstrap-icons';
import { useState } from 'react';
import { Role_Type_Insert } from 'Reducers/RoleAsyncActions';
export const Role_Select = ({membership,actions}) =>
{
    const current_role=membership?.user.roles?.filter((item) => item.group.id===membership.group.id && item.valid===true)
    const roles=useSelector(state =>state.roles)
    const role_list=Object.values(roles)
    const onRoleChange=({roletype_new,membership}) =>
    {
        console.log(roletype_new)
        const new_role=
=======
import { Hourglass } from 'react-bootstrap-icons';
export const Role_Select = ({ membership, actions }) => {
    console.log(membership)
    const current_role = membership?.user.roles?.filter((item) => item.group.id === membership.group.id && item.valid === true)
    console.log(current_role)
    const roles = useSelector(state => state.roles)
    const role_list = Object.values(roles)
    const onRoleChange = ({ roletype_new, membership }) => {
        console.log(membership)
        const new_role =
>>>>>>> dbe66582781190378c7897cc992829a3c9f86ec9
        {
            id:v1(),
            roletypeID:roletype_new.id,
            valid:true,
            groupId:membership.group.id,
            userId:membership.user.id,
            roletype:roletype_new,
            group:
            {
                id:membership.group.id
            }
        }
        actions.roleAsyncInsert(new_role)
        const new_role_store=
        {
            group:{id : membership.group.id},
            membership:{...membership,user:{...membership.user, roles:membership.user.roles.concat(new_role)}}
        }
        console.log(new_role_store)
        actions.onMemberUpdate(new_role_store)

    }
    const Make_New_Role = () => {

        const [input_role, set_input_role] = useState("")
        const onRoleMake = () => {
            console.log("button called")
            const payload = {
                id: v1(),
                name: input_role,
                nameEn: input_role
            }
            actions.roletype_insert(payload)
            onRoleChange({ roletype_new: payload, membership })
        }
        const handleInputChange = (event) => {
            set_input_role(event.target.value);
        };
        return (
            <>
                <input className="form-control" placeholder="new role" value={input_role} onChange={handleInputChange} />
                <button onClick={onRoleMake}><Hourglass></Hourglass></button>
            </>
        )
    }
    return (
        <DropdownButton id="dropdown-basic-button" title={current_role[current_role.length - 1]?.roletype.nameEn}>
            {role_list?.map((roletype_new) => (<Dropdown.Item onClick={event => onRoleChange({ roletype_new, membership })} >{roletype_new.nameEn}</Dropdown.Item>))}
            <Make_New_Role />
        </DropdownButton>
    )
  }
  
  

