import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { v1 } from 'uuid'
import { Hourglass } from 'react-bootstrap-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const onRoleChange= ({current_role,selectedRole,membership,actions}) =>
    {
        
        if(current_role)
        {
        actions.roleAsyncUpdate({role:{...current_role,valid:false},membership:membership})
        }
        if(selectedRole)
        { 
        actions.roleAsyncInsert({membership:membership,role:selectedRole})
        }

    }
const Make_New_Role = ({membership,actions}) => {

        const [input_role, set_input_role] = useState("")
        
        const handleInputChange = (event) => {
            set_input_role(event.target.value);
        };
        return (
            <>
                <input className="form-control" placeholder="new role" value={input_role} onChange={handleInputChange} />
                <button onClick={()=>onRoleMake({input_role,membership,actions})}><Hourglass></Hourglass></button>
            </>
        )
    }
const onRoleMake = ({input_role,membership,actions}) => {
        const payload = 
        {
        id: v1(),
        name: input_role,
        nameEn: input_role
        }
    actions.roletype_insert(payload)
    onRoleChange({selectedRole: payload, membership ,actions})
}
export const Role_Select = ({membership,actions}) =>
{   
    const current_role=membership?.user.roles?.filter((item) => item.group?.id===membership.group?.id && item.valid===true).splice(-1)[0]
    const roles=useSelector(state =>state.roles)
    const role_list=Object.values(roles)
    return (
        <>
        <DropdownButton id="dropdown-basic-button" title={current_role?.roletype?.nameEn}>
            {role_list?.map((selectedRole) => (<Dropdown.Item onClick={() => onRoleChange({ current_role,selectedRole, membership,actions })} >{selectedRole.nameEn}</Dropdown.Item>))}
            <Make_New_Role actions={actions} membership={membership} />
        </DropdownButton>
        <br/>
        <DatePickerComponent className="calender" current_role={current_role} membership={membership} actions={actions} />
        </>
    )
}
const DatePickerComponent = ({ current_role,membership ,actions }) => {
    const enddate=current_role?.enddate
    const [selectedDate, setSelectedDate] = useState(enddate ? new Date(enddate) : null);
    return (
      <DatePicker
        selected={selectedDate}
        onChange={(date)=>handleDateChange({date,setSelectedDate,current_role,membership,actions})}
        dateFormat="dd/MM/yyyy"
        placeholderText="Select a date"
      />
    );
  };
const handleDateChange = ({date,setSelectedDate,current_role,membership,actions}) => {
    const currentDate = new Date(); // Get the current date
    if (date > currentDate) 
    {
    setSelectedDate(date);
    if(current_role)
    {
    actions.roleAsyncUpdate({role:{...current_role,enddate:date.toISOString().slice(0, 19).replace('T', ' ')},membership:membership})
    }
    }
};
  
  

