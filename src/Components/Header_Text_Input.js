import { TextInput } from "./Text_Input"

/**
 * The function  to change the group's name 
 * @param {Object} group The group we want to change its name 
 * @param {Object} actions Actions needed to update the group's name in store and on server
 * @returns {JSX.Element} The Text input that shows the name of our group
 */
export const HeaderTextInput = ({ group, actions }) => {
   
    const onchange = (value) => {
        console.log(group)
        const payload = {
            id: group.id,
            lastchange: group.lastchange,
            valid: true,
            grouptypeId: group.grouptype.id,
            name: value
        }
        actions.groupNameAsyncUpdate(payload) //Update the group's name on sever
            .then(json=>console.log("GroupNameInput", json.data.groupUpdate.msg))
    }
    return (
        <TextInput id={group.id} value={group.name} placeholder={"Groups name"} onChange={onchange} />
    )
}