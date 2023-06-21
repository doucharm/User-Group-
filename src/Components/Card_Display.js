import { HeaderTextInput } from "./Header_Text_Input"
import { Table_Display } from "./Components Display"
import { GroupType_Select } from "./Grouptype_Selector"
import { Get_Chart } from "Data/Group_Hierarchy"
import { useState } from "react"

// Our page has 2 main branches, first one contains the card header of the group we're accessing to, the second one shows the details of that group like the users or subgroups
export const Card_Display = ({ group, set_display_id, actions }) => {
    const [show_chart,set_show_chart] = useState(false)
    const chart_view=Get_Chart(show_chart)
    return (
        <main>
            <div class="card  border-success border-10 border-dark rounded-6  mb-3" >
                <div class="card-header border-5 rounded border bg-secondary">
                    <Get_Card_Header group={group} set_display_id={set_display_id} actions={actions} /> 
                </div>
                <div class="card-body border-5 rounded border">
                    <Table_Display group={group} set_display_id={set_display_id} actions={actions} />   
                </div>
            </div>
            <button onClick = {event => set_show_chart(!show_chart)}>Display hierarchy</button>
            {chart_view}
        </main>
    )
}
// The functions return the card header
export const Get_Card_Header = ({ group, set_display_id, actions }) => {
    const MasterGroup = () => { // Create a button that allows us to go to the mastergroup of the group to which we're accessing
        if (group.mastergroup) { // Only if the group has a mastergroup
            return (
                <button onClick={event => set_display_id(group.mastergroup.id)}>Master group </button>
            )
        } else return;
    }
    // The output on the page's interface
    return (
        <div>
            <MasterGroup />
            <h3 class="text-left font-weight-bold">ID: {group.id} </h3>
            <h2 class="text-left"><HeaderTextInput group={group} actions={actions}/></h2>
            <h3 class="text-left font-weight-bold">Last change:{group.lastchange} </h3>
            <h3 class="text-left"><GroupType_Select group={group} actions={actions}/></h3>
        </div>
    )
}

