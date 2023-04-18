import { useState, useMemo, useCallback } from 'react'

import { CreateDelayer } from 'utils/Delayer'


export const Group_Name_Input = ({ value, placeholder, onChange }) => {
    const [new_value, set_value] = useState(value)
    const reName_Event = useCallback(
        (e) => {
            const newVal = e.target.value
            set_value(newVal)
            onChange(newVal)
        }
    )
    return (
        <input className='form-control' value={new_value} placeholder={placeholder} onChange={reName_Event} />
    )
}
