import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useSelector } from 'react-redux';

export const Role_Select = ({user,actions}) =>
{
  const [role,set_role] = useState(user.roles[0].roletype.nameEn)
  const roles=useSelector(state =>state.roles)
  const role_list=Object.values(roles)

  return (
  <DropdownButton id="dropdown-basic-button" title={role}>
    {role_list?.map((role)=>(<Dropdown.Item onClick={event => set_role(role.nameEn)} >{role.nameEn}</Dropdown.Item>)     )}
  </DropdownButton>
  )
}

