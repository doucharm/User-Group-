import { useEffect, useState } from "react"
import { DropdownButton } from "react-bootstrap"
import { Dropdown } from "react-bootstrap"
import { group_type_fetch } from "Data/GroupTypeQuery"
//Drop down button on card header to change the group type of the current group
export const GroupType_Select = ({group,actions}) => {
  const [group_type, set_group_type] = useState([]) //This use state set the group types with all of the group types from group type page to the group_type array
  useEffect(() => {
    group_type_fetch(set_group_type) 
  },set_group_type)
  // The function below defines what would happen if you click on one of the dropdown button 
  const onGroupTypeInsert = ({group,grouptype}) =>
  {
    // This mutation requires the below props
    const payload = {
      name: group.name,
      id: group.id,
      lastchange: group.lastchange,
      grouptypeId: grouptype.id,
      valid: true,
      mastergroupId: group.mastergroup.id
    }
    actions.groupAsyncUpdate(payload) // And finally we change the group type on server
  }
    // Show the possible options for the group type once you press it
  return (
    <DropdownButton id="dropdown-basic-button" title={group.grouptype?.nameEn}>
      {group_type?.map(grouptype=>(<Dropdown.Item onClick={() => onGroupTypeInsert({group,grouptype})} >{grouptype.nameEn}</Dropdown.Item>)     )}
    </DropdownButton>
    )
}