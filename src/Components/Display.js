import { Card_Display } from './Card_Display'
import { useState } from 'react'
import { useSelector} from 'react-redux';
export const Display = ({id}) =>
{
    const data=useSelector(state => state.groups)
    console.log(data)
    const [display_id,set_display_id] = useState(id)
    const display_item=data.groupPage?.filter((item) => item.id===display_id)
    return (
        <Card_Display group={display_item[0]} set_display_id={set_display_id}/>
    )
}
