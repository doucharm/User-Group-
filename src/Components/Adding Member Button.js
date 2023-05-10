import { useState, useCallback } from 'react';
import { PersonAdd, Save, Trash } from 'react-bootstrap-icons';
import { v1 } from 'uuid';

export const Adding_Member = ({new_user,set_new_user, onClick,setState0,setState1,state}) =>{ 

    if (state === 0) {
        return (
            <button className='btn btn-sm btn-primary' onClick={setState1}><PersonAdd></PersonAdd></button>
        )
    } else {

            
            function handleChange(evt) 
            {
                const value = evt.target.value;
                set_new_user({
                  ...new_user,
                  [evt.target.name]: value
                });
               
            }
        return (
            <>
            <label>User's first name:<input type="text" name="name" value={new_user.name} placeholder='Enter user first name' onChange={handleChange} /> </label>
            <label>User's surname:<input type="text" name="surname" value={new_user.lastName} placeholder='Enter user surname' onChange={handleChange} /> </label>  
            <label>User's email address:<input type="text" name="email" value={new_user.email} placeholder='Enter user email' onChange={handleChange} /> </label>
            
         
                <button className='btn btn-sm btn-warning' onClick={setState0}><Trash></Trash></button>
                <button className='btn btn-sm btn-success' onClick={onClick}><Save></Save></button>
            </>
        )
    }
}


export const Adding_Member_Button = ({group,  actions}) => {
    const [new_user, set_new_user] = useState({
        id:"",
        name: "",
        surname: "",
        email:"", 
        })
  const onClick = () => 
  {
    set_new_user({...new_user,id:v1()})
    const user=
    {
        id:v1(),
        user:{...new_user,id:v1()}
    }

    actions.onMemberAdd({group: group, user: user})
    setState0()

  }
  const [ state, setState ] = useState(0)
  const setState0 = useCallback(() => setState(0))
  const setState1 = useCallback(() => setState(1))

  return (
      <Adding_Member new_user={new_user} state={state} setState0={setState0} setState1={setState1} set_new_user={set_new_user} onClick={onClick}><PersonAdd></PersonAdd></Adding_Member>
  )
}