import { useEffect, useState } from "react"
import { DropdownButton } from "react-bootstrap"
import { Dropdown } from "react-bootstrap"
import { group_type_fetch } from "Data/GroupTypeQuery"
import { useSelector } from "react-redux"
/**
 * Drop down button on card header to change the group type of the current group
 * @param {Object} group The group we want to change its grouptype
 * @param {Object} actions The actions needed to update that group in store and on server
 * @returns {JSX.Element} A Dropdown button to choose the new grouptype for our group from grouptype page
*/
export const GroupType_Select = ({ group, actions }) => {
  const [group_type, set_group_type] = useState([]) //This use state set the group types with all of the group types from group type page to the group_type array
  useEffect(() => {
    group_type_fetch(set_group_type);
  }, []); // Wrap the set_group_type function inside an empty array
  const groups = useSelector((state) => state.groups);
  // The function below defines what would happen if you click on one of the dropdown button 
  const onGroupTypeInsert = async ({ group, grouptype }) => {
    // This mutation requires the below props
    console.log(group)
    if (group.mastergroup === null)
    {
      const payload = {
        id: group.id,
        lastchange: group.lastchange,
        valid: true,
        grouptypeId: grouptype.id,
        name: group.name
      }
      await actions.groupNameAsyncUpdate(payload)
    }
    else {
      const payload = {
        name: group.name,
        id: group.id,
        lastchange: group.lastchange,
        grouptypeId: grouptype.id,
        valid: true,
        mastergroupId: group.mastergroup.id
      }
      await actions.groupAsyncUpdate(payload) // And finally we change the group type on server
      const mastergroup = groups[group.mastergroup.id]
      const fetchedItem = await actions.groupFetch(group.id);
      actions.onUpdateSubGroup({ group: mastergroup, new_subgroup: fetchedItem.payload })
    }
    
  }
  // Show the possible options for the group type once you press it
  return (
    <DropdownButton id="dropdown-basic-button" title={group?.grouptype?.nameEn ? group?.grouptype?.nameEn:"N/A"}>
      {group_type?.map(grouptype => (<Dropdown.Item key={grouptype.id} onClick={() => onGroupTypeInsert({ group, grouptype })} >{grouptype.nameEn}</Dropdown.Item>))}
    </DropdownButton>
  )
}