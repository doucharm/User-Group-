import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useSelector } from 'react-redux';
import { v1 } from 'uuid'

export const Role_Select = ({user,group,actions}) =>
{
  const [role,set_role] = useState(user.roles[0].roletype.nameEn)
  const roles=useSelector(state =>state.roles)
  const role_list=Object.values(roles)
  function onRoleChange(role)
  {
    set_role(role.nameEn)
    const role_format=
    [
      {
        id:v1(),
        roletype:role
      }
    ]
    const new_user={...user,roles:role_format}
    const payload=
    {
        group:group,
        user:
        {
          id:user.membership[0].id,
          user:new_user
        }
    }
    actions.onMemberUpdate(payload)
    console.log(payload)
  }
  return (
  <DropdownButton id="dropdown-basic-button" title={role}>
    {role_list?.map((role)=>(<Dropdown.Item onClick={event => onRoleChange(role)} >{role.nameEn}</Dropdown.Item>)     )}
  </DropdownButton>
  )
}

