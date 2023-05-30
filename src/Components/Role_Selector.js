import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useSelector } from 'react-redux';
import { v1 } from 'uuid'
export const Role_Select = ({membership,actions}) =>
{
    console.log(membership)
    const current_role=membership?.user.roles?.filter((item) => item.group.id===membership.group.id && item.valid===true)
    console.log(current_role)
    const roles=useSelector(state =>state.roles)
    const role_list=Object.values(roles)
    const onRoleChange=({roletype_new,membership}) =>
    {
        console.log(membership)
        const new_role=
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
    return (
    <DropdownButton id="dropdown-basic-button" title={current_role[current_role.length-1]?.roletype.nameEn}>
      {role_list?.map((roletype_new)=>(<Dropdown.Item onClick={event => onRoleChange({roletype_new,membership})} >{roletype_new.nameEn}</Dropdown.Item>)     )}
    </DropdownButton>
    )
  }
  
  

