import { useCallback, useEffect, useState } from "react"
import { DropdownButton } from "react-bootstrap"
import { Dropdown } from "react-bootstrap"
import { group_type_fetch } from "Data/GroupTypeQuery"
export const GroupType_Select = ({group,actions}) => {
  const [group_type, set_group_type] = useState([])
  useEffect(() => {
    group_type_fetch(set_group_type)
  },set_group_type)
  console.log(group_type)
  const onGroupTypeInsert = ({group,grouptype}) =>
  {
    console.log(grouptype.id)
    const payload = {
      group: group,
      id: group.id,
      lastchange: group.lastchange,
      grouptypeId: grouptype.id
      
    }
    actions.grouptypeAsyncUpdate(payload)   
  }

  return (
    <DropdownButton id="dropdown-basic-button" title={group.grouptype?.nameEn}>
      {group_type?.map(grouptype=>(<Dropdown.Item onClick={event => onGroupTypeInsert({group,grouptype})} >{grouptype.nameEn}</Dropdown.Item>)     )}
    </DropdownButton>
    )
}