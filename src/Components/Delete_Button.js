import { useState } from 'react';
import { XOctagonFill } from 'react-bootstrap-icons';
/**
 * This is Two States Button with confirmation (two state button).
 * @param {*} icon the icon that indicate what this button do
 * @param {() => void} onClick function that get excercuted when button is clicked
 * @returns 
 */
export const Two_State_Button = ({ onClick, icon: Icon }) => {
    const [state, setState] = useState(false);
    if (!state) {
      return (
        <button className='btn btn-sm btn-warning' onClick={(event) => setState(!state)}>
          <Icon />
        </button>
      );
    } else {
      return (
        <>
          <button className='btn btn-sm btn-warning' onClick={(event) => setState(!state)}>
            <XOctagonFill></XOctagonFill>
          </button>
          <button className='btn btn-sm btn-danger' onClick={onClick}>
            <Icon />
          </button>
        </>
      );
    }
  };
  

