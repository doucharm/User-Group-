import { useState } from 'react';
import { XOctagonFill,Trash } from 'react-bootstrap-icons';
/**
 * This is Two States Button with confirmation (two state button).
 * @param {*} icon the icon that indicate what this button do
 * @param {*} sec_button second state of the button
 * @returns 
 */
export const Two_State_Button = ({ sec_button, icon: Icon }) => {
    const [state, setState] = useState(false);
    if (!state) {
      return (
        <button className='btn btn-sm btn-warning' onClick={(event) => setState(!state)}>
          <Icon />
        </button>
      );
    } else { // return one button for cancelation and another component that perform the intended action
      return (
        <>
          <button className='btn btn-sm btn-warning' onClick={(event) => setState(!state)}>
            <XOctagonFill></XOctagonFill>
          </button>
          {sec_button} 
        </>
      );
    }
  };
export const DeleteButton = ({ onClick }) =>
{
   const Icon=Trash
   const button_Delete= <button className='btn btn-sm btn-danger' onClick={onClick}><Icon /> </button>
   return (
    <Two_State_Button sec_button={button_Delete} icon={Icon} />
   )
}
  

