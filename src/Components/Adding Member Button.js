import { useState, useCallback } from 'react';
import { PersonAdd, Save, Trash } from 'react-bootstrap-icons';
import { v1 } from 'uuid';

export const Adding_Member = ({new_user,set_new_user, onClick}) =>{ 
    const [ state, setState ] = useState(0)
    const setState0 = useCallback(() => setState(0))
    const setState1 = useCallback(() => setState(1))

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
            <label>User's first name:<input type="text" name="firstName" value={new_user.firstName} placeholder='Enter user first name' onChange={handleChange} /> </label>
            <label>User's last name:<input type="text" name="lastName" value={new_user.lastName} placeholder='Enter user last name' onChange={handleChange} /> </label>  
            <label>User's first name:<input type="text" name="email" value={new_user.email} placeholder='Enter user email' onChange={handleChange} /> </label>
            
         
                <button className='btn btn-sm btn-warning' onClick={setState0}><Trash></Trash></button>
                <button className='btn btn-sm btn-success' onClick={onClick}><Save></Save></button>
            </>
        )
    }
}


export const Adding_Member_Button = ({group,  actions}) => {
    const [new_user, set_new_user] = useState({
        id:"",
        firstName: "",
        lastName: "",
        email:"", 
        })
  const onClick = () => 
  {
    set_new_user({...new_user,id:v1()})
    const user=
    {
        id:v1(),
        user:new_user
    }

    actions.onMemberAdd({group: group, user: user})
  }
  return (
      <Adding_Member new_user={new_user} set_new_user={set_new_user} onClick={onClick}><PersonAdd></PersonAdd></Adding_Member>
  )
}