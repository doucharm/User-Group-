import { TextInput } from "./Text_Input"

export const HeaderTextInput = ({ group, actions }) => {
    const onchange = (value) => {
        //console.log("changed", value)

        actions.groupAsyncUpdate({ ...group, name: value })
            .then(json => console.log("GroupNameInput", json.data.groupUpdate.msg))
    }
    return (
        <TextInput id={group.id} value={group.name} placeholder={"Groups name"} onChange={onchange} />
    )
}