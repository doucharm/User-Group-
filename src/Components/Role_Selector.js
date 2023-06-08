import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { v1 } from 'uuid'
import { Hourglass } from 'react-bootstrap-icons';import { Role_Type_Insert } from 'Reducers/RoleAsyncActions';
export const Role_Select = ({membership,actions}) =>
{
    const current_role=membership?.user.roles?.filter((item) => item.group?.id===membership.group?.id && item.valid===true)
    const old_role=current_role[current_role.length-1]
    const roles=useSelector(state =>state.roles)
    const role_list=Object.values(roles)
    const onRoleChange=({roletype_new,membership}) =>
    {
        const new_role=
        {
            membership:membership,
            role:roletype_new
        }
        if(old_role)
        {
        actions.roleAsyncUpdate(old_role)
        }
        actions.roleAsyncInsert(new_role)
       

    }
    const Make_New_Role = () => {

        const [input_role, set_input_role] = useState("")
        const onRoleMake = () => {
                const payload = 
                {
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
  
  

