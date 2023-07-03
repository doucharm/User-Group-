import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { v1 } from 'uuid'
import { Hourglass } from 'react-bootstrap-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
 /**
 * onRoleChange is an event handler to handler  role change
 * @param {Object} current_role - The current role object, containing information about the role. 
 * @param {Object} selectedRole - The selected role when changing role
 * @param {Object} membership - The membership details associated with the current role.
 * @param {Object} actions - An object containing various actions related to the current role.
 */ 
const onRoleChange= ({current_role,selectedRole,membership,actions}) =>
    {
        
        if(current_role) // if provided will invalidate the current role
        {
        actions.roleAsyncUpdate({role:{...current_role,valid:false},membership:membership})
        }
        if(selectedRole) // add a new valid role for this user in this group
        { 
        actions.roleAsyncInsert({membership:membership,role:selectedRole})
        }

    }
 /**
 * Make_New_Role allow user to create a custom role for a member of a group with the idea that this role is exclusive for that group and will not be shown when select role for another member
 * @param {Object} membership - The membership details associated with the current role.
 * @param {Object} actions - An object containing various actions related to the current role.
 * @returns {JSX.Element} - Input box for user's information and confirmation button
 */   
const MakeNewRole = ({membership,actions}) => {

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
        const payload = //template for new role to be passed onto the server
        {
        id: v1(),
        name: input_role,
        nameEn: input_role
        }
    actions.roletype_insert(payload) // insert this role into the role type list 
    onRoleChange({selectedRole: payload, membership ,actions}) //change the role of member
}
/**
 * Role_Select is an React JS component to display the current role of a member in a group ( if existed ) and 
 * allowing users to change attributes associate with a member's role such as role, end date or validaty
 * @param {Object} membership - The membership details associated with the current role.
 * @param {Object} actions - An object containing various actions related to the current role.
 * @returns {JSX.Element} - A dropdown menu detaling available roles and option for custom role
 * @returns {JSX.Element} - React Calender for displaying and modifing end date
 */
export const Role_Select = ({membership,actions}) =>
{   
    const current_role=membership?.user.roles?.filter((item) => item.group?.id===membership.group?.id && item.valid===true).splice(-1)[0]
    const roles=useSelector(state =>state.roles)
    const role_list=Object.values(roles) // roles is an dictionary need to be an array
    return (
        <>
        <DropdownButton id="dropdown-basic-button" title={ current_role?.roletype?.nameEn ? current_role?.roletype?.nameEn:"none" }>
            {role_list?.map((selectedRole) => (<Dropdown.Item key={selectedRole.id} onClick={() => onRoleChange({ current_role,selectedRole, membership,actions })} >{selectedRole.nameEn}</Dropdown.Item>))}
            <MakeNewRole actions={actions} membership={membership} />
        </DropdownButton>
        <br/>
        <DatePickerComponent className="calender" current_role={current_role} membership={membership} actions={actions} />
        </>
    )
}
/**
 * DatePickerComponent displays a date picker using the `react-datepicker` library,
 * allowing users to select a date.
 * @param {Object} current_role - The current role object, containing information about the role.
 * @param {Object} membership - The membership details associated with the current role.
 * @param {Object} actions - An object containing various actions related to the current role.
 * @returns {Component} - Returns the DatePicker Component.
 */
const DatePickerComponent = ({ current_role,membership ,actions }) => {
    const enddate=current_role?.enddate
    const [selectedDate, setSelectedDate] = useState(enddate ? new Date(enddate) : null); // check if user's role has an end date to display
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
    if (date > currentDate) //filter for when enddate is earlier than present day
    {
    setSelectedDate(date);
    if(current_role) // when a role does exist the callender will change it's enddate
    {
    //date need to be converted to use on GQL
    actions.roleAsyncUpdate({role:{...current_role,enddate:date.toISOString().slice(0, 19).replace('T', ' ')},membership:membership})
    }
    }
};
  
  

