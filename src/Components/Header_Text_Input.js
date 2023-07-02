import { TextInput } from "./Text_Input"

/**
 * The function  to change the group's name 
 * @param {*} group The group we want to change its name 
 * @param {*} actions Actions needed to update the group's name in store and on server
 * @returns The Text input that shows the name of our group
 */
export const HeaderTextInput = ({ group, actions }) => {
    const onchange = (value) => {
        const payload = {
            id: group.id,
            lastchange: group.lastchange,
            valid: true,
            grouptypeId: group.grouptype.id,
            mastergroupId: group.mastergroup.id,
            name: value
        }
        actions.groupAsyncUpdate(payload) //Update the group's name on sever
            .then(json=>console.log("GroupNameInput", json.data.groupUpdate.msg))
    }
    return (
        <TextInput id={group.id} value={group.name} placeholder={"Groups name"} onChange={onchange} />
    )
}