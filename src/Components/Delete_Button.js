import { useState, useCallback } from 'react';
import { Trash , X} from 'react-bootstrap-icons';
/**
 * This is Delete Button with confirmation (two state button).
 * @param {*} children
 * @param {() => void} onClick
 * @returns 
 */
export const DeleteButton = ({onClick}) => {
    const [ state, setState ] = useState(0)
    const setState0 = useCallback(() => setState(0))
    const setState1 = useCallback(() => setState(1))

    if (state === 0) {
        return (
            <button className='btn btn-sm btn-warning' onClick={setState1}><Trash></Trash></button>
        )
    } else {
        return (
            <>
                <button className='btn btn-sm btn-warning' onClick={setState0}><X></X></button>
                <button className='btn btn-sm btn-danger' onClick={onClick}><Trash></Trash></button>
            </>
        )
    }
}

export const GroupMemberRemoveButton = ({group, user, actions}) => {
  const onClick = () => {
      actions.onMemberRemove({group: group, user: user})
  }
  return (
      <DeleteButton onClick={onClick}><Trash></Trash></DeleteButton>
  )
}