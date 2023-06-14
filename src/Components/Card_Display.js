import { HeaderTextInput } from "./Header_Text_Input"
import { Table_Display } from "./Components Display"
import { GroupType_Select } from "./Grouptype_Selector"
import { useSelector } from "react-redux"
import { OrganizationChart } from "primereact/organizationchart"
import { useState } from "react"


export const Card_Display = ({ group, set_display_id, actions }) => {
    const [show_chart,set_show_chart] = useState(false)
    const pom=[
        {
            label: 'Argentina',
            expanded: true,
            children: [
                {
                    label: 'Argentina',
                    expanded: true,
                    children: [
                        {
                            label: 'Argentina'
                        },
                        {
                            label: 'Croatia'
                        }
                    ]
                },
                {
                    label: 'France',
                    expanded: true,
                    children: [
                        {
                            label: 'France'
                        },
                        {
                            label: 'Morocco'
                        }
                    ]
                }
            ]
        }
    ]
    console.log(pom)
    const Get_Chart = (show_chart) =>
    {
        const hierarchy=useSelector(state => state.hierarchy)
        
        const hierarchy_list=Object.values(hierarchy)
        console.log("hierarchy into the part",hierarchy_list)
    if( show_chart && hierarchy[0] )
    {
        return (
            <div className="card overflow-x-auto">
                <OrganizationChart value={hierarchy_list} />
            </div>
        )  
    }

     else return ("Nic");
    }
    const chart_view=Get_Chart(show_chart)
    console.log("chart view",chart_view)
    return (
        <main>
            <div class="card  border-success  bg-info mb-3" >
                <div class="card-header">
                    <Get_Card_Header group={group} set_display_id={set_display_id} actions={actions} />
                </div>
                <div class="card-body">
                    Components of the group:
                    <Table_Display group={group} set_display_id={set_display_id} actions={actions} />
                    <button onClick = {event => set_show_chart(!show_chart)}>Display hierarchy</button>
                    {chart_view}
                </div>
            </div>
        </main>
    )
}

export const Get_Card_Header = ({ group, set_display_id, actions }) => {
    const MasterGroup = () => {
        if (group.mastergroup) {
            return (
                <button onClick={event => set_display_id(group.mastergroup.id)}>Master group </button>
            )
        } else return;
    }
    
    return (
        <div>
            <MasterGroup />
        <tr>
            ID: {group.id} <br />
            <HeaderTextInput group={group} actions={actions}/>
            Last change:{group.lastchange} <br />
            Group type: <GroupType_Select group={group} actions={actions}/> 
        </tr>
        </div>
    )
}

