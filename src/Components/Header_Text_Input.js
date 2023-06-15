import { TextInput } from "./Text_Input"
// The function  to change the group's name 
export const HeaderTextInput = ({ group, actions }) => {
    const onchange = (value) => {
        const payload = {
            id: group.id,
            lastchange: group.lastchange,
            name: value
        }
        actions.groupAsyncUpdate(payload) //Update the group's name on sever
            .then(json=>console.log("GroupNameInput", json.data.groupUpdate.msg))
    }
    return (
        <TextInput id={group.id} value={group.name} placeholder={"Groups name"} onChange={onchange} />
    )
}