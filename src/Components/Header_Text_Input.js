import { TextInput } from "./Text_Input"

export const HeaderTextInput = ({group}) => {
    return (
        <TextInput id={group.id} value={group.name} placeholder={"Groups name"} />
    )
}